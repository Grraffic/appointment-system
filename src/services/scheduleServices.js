import axios from "axios";

const BASE_URL = "https://appointment-system-backend-n8dk.onrender.com/api/schedule";

// Validate schedule data
const validateScheduleData = (data) => {
  const slots = Number(data.slots);
  const bookedSlots = Number(data.bookedSlots || 0);

  if (isNaN(slots) || slots <= 0) {
    throw new Error("Invalid slots value - must be greater than 0");
  }

  if (slots < bookedSlots) {
    throw new Error(`Cannot set slots less than booked slots (${bookedSlots} already booked)`);
  }

  if (!data.date) {
    throw new Error("Date is required");
  }
  if (!data.startTime) {
    throw new Error("Start time is required");
  }
  if (!data.endTime) {
    throw new Error("End time is required");
  }
};

// Format schedule data for API
const formatScheduleData = (data) => {
  // Ensure numerical values
  const slots = Number(data.slots);
  const bookedSlots = Number(data.bookedSlots || 0);
  const availableSlots = slots - bookedSlots;

  return {
    slots: slots,
    date: new Date(data.date).toISOString(),
    startTime: data.startTime,
    endTime: data.endTime,
    bookedSlots: bookedSlots,
    availableSlots: availableSlots
  };
};

// Handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    throw new Error(error.response.data.message || 'Server error');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server');
  } else {
    // Something happened in setting up the request
    throw new Error(error.message || 'Request failed');
  }
};

export const getAllSchedules = async () => {
  try {
    console.log('Fetching schedules from:', BASE_URL);
    const response = await axios.get(BASE_URL);
    
    // Transform the response to include calculated available slots
    const schedules = response.data.map(schedule => ({
      ...schedule,
      availableSlots: schedule.slots - (schedule.bookedSlots || 0),
      bookedSlots: schedule.bookedSlots || 0
    }));
    
    console.log('Processed schedules:', schedules);
    return schedules;
  } catch (error) {
    console.error('Error details:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch schedules');
  }
};

export const getAvailableSlots = async (date) => {
  try {
    const url = `${BASE_URL}/available/${date}`;
    console.log('Fetching slots from:', url);
    const response = await axios.get(url);
    
    // Transform response to include availability status
    const slots = response.data.map(slot => ({
      ...slot,
      isAvailable: slot.availableSlots > 0,
      status: slot.availableSlots > 0 ? 'available' : 'fully booked'
    }));
    
    console.log('Processed slots:', slots);
    return slots;
  } catch (error) {
    console.error('Error details:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch available slots');
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    console.log('Booking appointment with data:', appointmentData);
    console.log('Sending request to:', `${BASE_URL}/book`);
    
    // Validate appointment data
    if (!appointmentData.date || !appointmentData.timeSlot || !appointmentData.scheduleId) {
      throw new Error('Invalid appointment data: Missing required fields');
    }

    const response = await axios.post(`${BASE_URL}/book`, appointmentData);
    console.log('Booking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Booking error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    
    if (error.response?.status === 404) {
      throw new Error('Booking endpoint not found. Please check if the server is running.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid booking data');
    } else if (!error.response) {
      throw new Error('Unable to connect to the booking service. Please check if the server is running.');
    }
    
    throw new Error(error.response?.data?.message || 'Failed to book appointment');
  }
};

// Create a new schedule
export const createSchedule = async (scheduleData) => {
  try {
    validateScheduleData(scheduleData);
    const formattedData = formatScheduleData(scheduleData);
    const response = await axios.post(BASE_URL, formattedData);
    return response.data;
  } catch (error) {
    if (error.message) {
      throw error;
    }
    handleApiError(error);
  }
};

// Update a schedule
export const updateSchedule = async (id, scheduleData) => {
  try {
    if (!id) {
      throw new Error("Schedule ID is required");
    }
    validateScheduleData(scheduleData);
    
    const formattedData = formatScheduleData(scheduleData);
    console.log('Updating schedule with data:', formattedData);
    
    const response = await axios.put(`${BASE_URL}/${id}`, formattedData);
    return response.data;
  } catch (error) {
    if (error.message) {
      throw error;
    }
    handleApiError(error);
  }
};

// Delete a schedule
export const deleteSchedule = async (id) => {
  try {
    if (!id) {
      throw new Error("Schedule ID is required");
    }
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
