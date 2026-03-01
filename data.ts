
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
      

      // COURSE: PLCs & Industrial Automation
      { id: 'plcs-adv',
        title: 'Programmable Logic Controllers (PLCs)',
        emoji: '📟',
        description: 'Industrial automation using standard logic controllers.',
        modules: [
          {id: `plcs-mod-1`,
            title: 'FESTO MPV-E-A12-M8',
            description: 'Getting started with the FESTO MPV-E-A12-M8 for automation projects.',
            blocks: [
              {id: 'b1', type: 'markdown', content: '# Overview of the FESTO MPV-E-A12-M8\n\nTraditionally, in our labs, we\'ve constructed our \'power distributers\' using simple terminal blocks *(one with +24V, and another with 0V)*. However, the FESTO MPV-E-A12-M8 PLC offers a more integrated solution, combining power distribution with control capabilities in a single compact unit. This PLC is designed for educational and prototyping purposes, making it ideal for our lab environment.'},
              {id: 'b2', type: 'image', content: 'plcs_festo_mpvea12m8_component.png', metadata: { alt: 'Image of FESTO MPV-E-A12-M8 Power & Signal Distributor', format: 'no-shadow'}},
              {id: 'b3', type: 'markdown', content: 'The FESTO MPV-E-A12-M8 essentially serves as a signal breakout board, allowing us to easily connect a single field device to a single port (*these ports are called the sockets, or 3-port connectors*), and use the **multi-port connector** as a main line to connect to our PLC. Let\'s examine how this is done!'},
              {id: 'b4', type: 'markdown', content: '# Pinout Diagram\n\nThe datasheet & the color codes for the wires of the multi-port connector are shown below.\n- Starting from the center of the datasheet, you\'ll notice there are a total of 15 pins on the **multi-pin connector**. Each of these pins connect to a specifically-colored wire within the main cable, shown in the second image. Within the first diagram, on either side of the multi-pin connector, each pin is layed out and described, which relates to... \n- The outer sides of the wiring diagram, where we find several **3-prong connections**, with ports labelled as 1, 3, and 4.\n- The **allocation** column shows how these two connection types are related, and describes their function, which will always be **`24V`**, **`0V`**, or a **`signal`** connection. \n\nFor example, notice that in the **allocation** column **`24 V DC`** and **`0 V`** are always shown for every circular connector, and always correspond to **`pin 1`** and **`pin 3`**. On the multi-pin connector, these always correspond to pin 13 and pin 14/15 respectively.\n\nThis means that we want to feed **`24V`** from our **CLICK Power Module** to **`pin 13`** of the multiport connector (which corresponds to the **white-green** wire within the main cable), and connect **`pin 14`** or **`15`** (white-yellow wire) to the **`0V`** terminal of our power supply.'},
              {id: 'b5', type: 'image', content: 'plcs_festo_mpvea12m8.png', metadata: { alt: 'Pinout diagram of FESTO MPV-E-A12-M8', format: 'no-shadow'}},
              {id: 'b6', type: 'image', content: 'plcs_festo_mpvea12m8_connector_pinout.png', metadata: { alt: 'Pinout diagram of FESTO MPV-E-A12-M8', format: 'no-shadow'}},
              {id: 'b7', type: 'dropdown', content: 'Example of 0V Connection', children: [
                {id: 'b7-1', type: 'markdown', content: 'If we wish to provide a 0V connection to ***all connected field devices***, we must provide a 0V connection to **`pin 14`** or **`pin 15`** of the multi-pin header.'},
                {id: 'b7-2', type: 'image', content: '', metadata: { alt: 'Example of 0V Connection on FESTO MPV-E-A12-M8', format: 'no-shadow'}}
              ]},
            ]
          },

          { id: 'plcs-mod-2',
            title: 'FESTO MecLab Stations',
            description: 'Programming and controlling the FESTO MecLab stations for automation projects.',
            blocks: [
              {id: 'b1', type: 'markdown', content: '# Overview of the FESTO MecLab Stations\n\nThe FESTO MecLab stations are modular training systems designed for hands-on learning in automation and mechatronics. Each station focuses on a specific aspect of industrial automation, such as pneumatics, hydraulics, or electrical control. For our purposes, we will be connecting the FESTO brand PLCs to the MecLab trainer systems and programming in their functionality.'},
              {id: 'b2', type: 'image', content: 'plcs_festo_stations.png', metadata: { alt: 'Image of FESTO MecLab Trainer Station', format: 'no-shadow'}},
            ]
          }
        ] 
      },

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

      // COURSE: Microcontrollers & Embedded Systems
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
              {id: 'b1', type: 'markdown', content: '## What is the Arduino IDE?\n\nThe Arduino IDE, known as Arduino Integrated Development Environment, provides all the software support needed to complete an Arduino project. It is a programming software specifically designed for Arduino, provided by the Arduino team, that allows us to write programs and upload them to the Arduino board.'},
              {id: 'b2', type: 'text', content: 'The Arduino IDE 2.0 is an open-source project. It is a big step from its sturdy predecessor, Arduino IDE 1.x, and comes with revamped UI, improved board & library manager, debugger, autocomplete feature and much more.'},
              {id: 'b3', type: 'text', content: 'In this tutorial, we will show how to download and install the Arduino IDE 2.0 on your Windows, Mac, or Linux computer.'},
              {id: 'b4', type: 'markdown', content: '1. Visit [Arduino Software](https://www.arduino.cc/en/software/) page. \n2. Download the IDE for your OS version.'},
              {id: 'b5', type: 'webimage', content: 'https://docs.sunfounder.com/projects/kepler-kit/en/latest/_images/sp_001.png'},
              {id: 'b6', type: 'markdown', content: '## Installation\n 1. Run the downloaded installer. \n2. Read the License Agreement and agree to it.'},
              {id: 'b7', type: 'webimage', content: 'https://docs.sunfounder.com/projects/kepler-kit/en/latest/_images/sp_002.png'},
              {id: 'b8', type: 'markdown', content: '3. Choose the Install Option. \n4. Choose install location. It is recommended that the software be installed on a drive other than the system drive. \n5. Finally, click the **Finish** button.'},
              {id: 'b9', type: 'image', content: 'plcs_festo_mpvea12m8.png', metadata: { alt: 'Pinout diagram of FESTO MPV-E-A12-M8'}}
            ]
          }
        ]
      },

      // COURSE: Motor Controls & Drives
      { id: 'motor-ctrl', 
        title: 'Motor Controls', 
        emoji: '⚡', description: 'AC/DC motor theory and variable frequency drives.', 
        modules: [] 
      },

      // COURSE: Industrial Networking
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
