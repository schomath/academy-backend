
import { Category } from './types';

export const CATEGORIES: Category[] = [

  // CATEGORY: Mechatronics
  {
    id: 'mechatronics',
    title: 'Mechatronics',
    emoji: '⚙️',
    description: 'Blending mechanical engineering, electronics, and computing.',
    color: 'blue',

    // COURSES
    courses: [
      { id: 'hydraulics-101',
        title: 'Hydraulics & Fluid Power',
        emoji: '💧',
        description: 'Master the principles of fluid power systems and pneumatic controls.',
        modules: [
          {
            id: 'h-mod-1',
            title: 'Basics of Fluid Pressure',
            description: 'Understanding Pascal\'s Law and its applications.',
            blocks: [
              { id: 'b1', type: 'text', content: 'Pascal\'s principle states that pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and to the walls of the containing vessel.' },
              { id: 'b2', type: 'video', content: 'https://www.youtube.com/embed/SmdX2fOAs-Y' },
              { id: 'b3', type: 'text', content: 'Hey is this working'},
              { id: 'b4', type: 'lab', content: 'pressure-calculator', title: 'Interactive Pressure Lab' }
            ]
          },
          { id: 'h-mod-2', title: 'Pumps & Actuators', description: 'Moving heavy loads with precision.', blocks: [] }
        ]
      },
      {
        id: 'microcontrollers',
        title: 'Microcontrollers & Embedded Systems',
        emoji: '🖥️',
        description: 'Programming microcontrollers for real-time control and automation.',
        modules: [
          { id: 'mc-mod-1',
            title: 'Intro to Microcontrollers',
            description: 'Architecture and programming basics of microcontrollers.',
            blocks: [
              { id: 'b1', type: 'text', content: 'Microcontrollers are compact integrated circuits designed to govern specific operations in embedded systems.' },
              { id: 'b2', type: 'text', content: 'They typically include a processor, memory, and input/output peripherals on a single chip.' }
            ]
          },

          {
            id: 'mc-mod-2',
            title: 'Installing the Arduin IDE',
            description: 'Setting up the development environment for Arduino programming.',
            blocks: [
              {id: 'b1', type: 'text', content: 'The Arduino IDE, known as Arduino Integrated Development Environment, provides all the software support needed to complete an Arduino project. It is a programming software specifically designed for Arduino, provided by the Arduino team, that allows us to write programs and upload them to the Arduino board.'},
              {id: 'b2', type: 'text', content: 'The Arduino IDE 2.0 is an open-source project. It is a big step from its sturdy predecessor, Arduino IDE 1.x, and comes with revamped UI, improved board & library manager, debugger, autocomplete feature and much more.'},
              {id: 'b3', type: 'text', content: 'TIn this tutorial, we will show how to download and install the Arduino IDE 2.0 on your Windows, Mac, or Linux computer.'},

              {id: 'b4', type: 'markdown', content: '1. Visit [Arduino Software](https://www.arduino.cc/en/software/) page.'}

            ]
          }
        ]
      },

      { id: 'plcs-adv',
        title: 'Programmable Logic Controllers (PLCs)',
        emoji: '📟',
        description: 'Industrial automation using standard logic controllers.',
        modules: [] 
      },

      { id: 'motor-ctrl', 
        title: 'Motor Controls', 
        emoji: '⚡', description: 'AC/DC motor theory and variable frequency drives.', 
        modules: [] 
      },

      { id: 'ind-net', 
        title: 'Industrial Networking', 
        emoji: '🌐', 
        description: 'Protocols and architecture for factory floor connectivity.', 
        modules: [] 
      }
    ]
  },

  // CATEGORY: AI & Robotics
  { id: 'ai-robotics',
    title: 'AI & Robotics',
    emoji: '🤖',
    description: 'Building the brains and bodies of the future.',
    color: 'purple',
    courses: [
      {
        id: 'ds-processing',
        title: 'Data Structures and Processing',
        emoji: '🌳',
        description: 'Efficiently handling sensor data and decision trees in real-time.',
        modules: [
          {
            id: 'ai-mod-1',
            title: 'Sensor Fusion Algorithms',
            description: 'Combining multiple sensors for environmental awareness.',
            blocks: [
              { id: 'b4', type: 'text', content: 'Sensor fusion is the process of combining data derived from disparate sources such that the resulting information has less uncertainty than would be possible when these sources were used individually.' },
              { id: 'b5', type: 'lab', content: 'kalman-filter-demo', title: 'Kalman Filter Simulator' }
            ]
          }
        ]
      },
      { id: 'robot-arch', title: 'Architecture of Robots', emoji: '🏛️', description: 'Kinematics, power distribution, and structural design.', modules: [] }
    ]
  },

  // CATEGORY: Computer Science
  {
    id: 'computer-science',
    title: 'Computer Science',
    emoji: '💻',
    description: 'The foundation of modern software systems.',
    color: 'emerald',
    courses: [
      { id: 'java-1', title: 'Intro to Java: Foundations', emoji: '☕', description: 'Variables, loops, and control flow in the Java language.', modules: [] },
      { id: 'java-2', title: 'Intro to Java: Objects', emoji: '📦', description: 'Object-oriented programming, classes, and inheritance.', modules: [] },
      { id: 'java-3', title: 'Intro to Java: Advanced', emoji: '🔥', description: 'Generics, streams, and functional interfaces.', modules: [] },
      { id: 'java-ds', title: 'Data Structures in Java', emoji: '🧬', description: 'Linked lists, hash maps, and sorting algorithms.', modules: [] }
    ]
  }
];
