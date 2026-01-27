

type ScheduleItem = {
  id: string;
  day: string;
  time: string;
  capacity: number;
};

type ClassScheduleMap = {
  [key: string]: ScheduleItem[];
};

const classSchedules: ClassScheduleMap = {
  tabata: [
    {
      id: "tabata-mon-6am",
      day: "Monday",
      time: "6:00 AM - 6:45 AM",
      capacity: 15,
    },
    {
      id: "tabata-mon-12pm",
      day: "Monday",
      time: "12:00 PM - 12:45 PM",
      capacity: 15,
    },
    {
      id: "tabata-mon-630pm",
      day: "Monday",
      time: "6:30 PM - 7:15 PM",
      capacity: 15,
    },
    {
      id: "tabata-wed-6am",
      day: "Wednesday",
      time: "6:00 AM - 6:45 AM",
      capacity: 15,
    },
    {
      id: "tabata-wed-12pm",
      day: "Wednesday",
      time: "12:00 PM - 12:45 PM",
      capacity: 15,
    },
    {
      id: "tabata-wed-630pm",
      day: "Wednesday",
      time: "6:30 PM - 7:15 PM",
      capacity: 15,
    },
    {
      id: "tabata-fri-6am",
      day: "Friday",
      time: "6:00 AM - 6:45 AM",
      capacity: 15,
    },
    {
      id: "tabata-fri-12pm",
      day: "Friday",
      time: "12:00 PM - 12:45 PM",
      capacity: 15,
    },
    {
      id: "tabata-fri-630pm",
      day: "Friday",
      time: "6:30 PM - 7:15 PM",
      capacity: 15,
    },

    {
      id: "tabata-wed-6am",
      day: "Wednesday",
      time: "6:00 AM - 6:45 AM",
      capacity: 15,
    },
    { id: "tabata-wed-12pm", day: "Wednesday", time: "12:00 PM - 12:45 PM", capacity: 15, },
    { id: "tabata-wed-630pm", day: "Wednesday", time: "6:30 PM - 7:15 PM", capacity: 15, },

    { id: "tabata-fri-6am", day: "Friday", time: "6:00 AM - 6:45 AM", capacity: 15, },
    { id: "tabata-fri-12pm", day: "Friday", time: "12:00 PM - 12:45 PM", capacity: 15, },
    { id: "tabata-fri-630pm", day: "Friday", time: "6:30 PM - 7:15 PM", capacity: 15, },
  ],

  "strength-training": [
    { id: "strength-tue-7am", day: "Tuesday", time: "7:00 AM - 8:00 AM", capacity: 15, },
    { id: "strength-tue-1pm", day: "Tuesday", time: "1:00 PM - 2:00 PM", capacity: 15, },
    { id: "strength-tue-7pm", day: "Tuesday", time: "7:00 PM - 8:00 PM", capacity: 15, },

    { id: "strength-thu-7am", day: "Thursday", time: "7:00 AM - 8:00 AM", capacity: 15, },
    { id: "strength-thu-1pm", day: "Thursday", time: "1:00 PM - 2:00 PM", capacity: 15, },
    { id: "strength-thu-7pm", day: "Thursday", time: "7:00 PM - 8:00 PM", capacity: 15, },

    { id: "strength-sat-9am", day: "Saturday", time: "9:00 AM - 10:00 AM", capacity: 15,},
    { id: "strength-sat-11am", day: "Saturday", time: "11:00 AM - 12:00 PM" , capacity: 15,},
  ],

  yoga: [
    { id: "yoga-mon-7am", day: "Monday", time: "7:00 AM - 8:00 AM", capacity: 15, },
    { id: "yoga-mon-530pm", day: "Monday", time: "5:30 PM - 6:30 PM", capacity: 15, },
    { id: "yoga-mon-8pm", day: "Monday", time: "8:00 PM - 9:00 PM" , capacity: 15,},

    { id: "yoga-thu-7am", day: "Thursday", time: "7:00 AM - 8:00 AM" , capacity: 15,},
    { id: "yoga-thu-530pm", day: "Thursday", time: "5:30 PM - 6:30 PM", capacity: 15, },
    { id: "yoga-thu-8pm", day: "Thursday", time: "8:00 PM - 9:00 PM", capacity: 15, },

    { id: "yoga-sun-8am", day: "Sunday", time: "8:00 AM - 9:00 AM", capacity: 15, },
    { id: "yoga-sun-6pm", day: "Sunday", time: "6:00 PM - 7:00 PM", capacity: 15, },
  ],

  hiit: [
    { id: "hiit-tue-6am", day: "Tuesday", time: "6:00 AM - 6:45 AM", capacity: 15, },
    { id: "hiit-tue-1230pm", day: "Tuesday", time: "12:30 PM - 1:15 PM", capacity: 15, },
    { id: "hiit-tue-6pm", day: "Tuesday", time: "6:00 PM - 6:45 PM", capacity: 15, },

    { id: "hiit-fri-6am", day: "Friday", time: "6:00 AM - 6:45 AM", capacity: 15, },
    { id: "hiit-fri-1230pm", day: "Friday", time: "12:30 PM - 1:15 PM", capacity: 15, },
    { id: "hiit-fri-6pm", day: "Friday", time: "6:00 PM - 6:45 PM", capacity: 15, },
  ],

  crossfit: [
    { id: "crossfit-mon-630am", day: "Monday", time: "6:30 AM - 7:30 AM", capacity: 15, },
    { id: "crossfit-mon-12pm", day: "Monday", time: "12:00 PM - 1:00 PM", capacity: 15, },
    { id: "crossfit-mon-730pm", day: "Monday", time: "7:30 PM - 8:30 PM" , capacity: 15,},

    { id: "crossfit-wed-630am", day: "Wednesday", time: "6:30 AM - 7:30 AM", capacity: 15, },
    { id: "crossfit-wed-12pm", day: "Wednesday", time: "12:00 PM - 1:00 PM", capacity: 15, },
    { id: "crossfit-wed-730pm", day: "Wednesday", time: "7:30 PM - 8:30 PM", capacity: 15, },

    { id: "crossfit-sat-930am", day: "Saturday", time: "9:30 AM - 10:30 AM", capacity: 15, },
    { id: "crossfit-sat-1130am", day: "Saturday", time: "11:30 AM - 12:30 PM", capacity: 15, },
  ],

  "mobility-recovery": [
    { id: "mobility-wed-8am", day: "Wednesday", time: "8:00 AM - 8:45 AM", capacity: 15, },
    { id: "mobility-wed-3pm", day: "Wednesday", time: "3:00 PM - 3:45 PM", capacity: 15, },
    { id: "mobility-wed-815pm", day: "Wednesday", time: "8:15 PM - 9:00 PM", capacity: 15, },

    { id: "mobility-sun-9am", day: "Sunday", time: "9:00 AM - 9:45 AM", capacity: 15, },
    { id: "mobility-sun-4pm", day: "Sunday", time: "4:00 PM - 4:45 PM", capacity: 15, },
    { id: "mobility-sun-815pm", day: "Sunday", time: "8:15 PM - 9:00 PM", capacity: 15, },
  ],
};

export default classSchedules;
