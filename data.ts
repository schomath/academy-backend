
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
      { id: 'plcs',
        title: 'Programmable Logic Controllers (PLCs)',
        emoji: '📟',
        description: 'Industrial automation using standard logic controllers.',
        modules: [],
        moduleCategories: [
          { id: 'plcs-click',
            title: 'CLICK PLC Documentation',
            emoji: '📟',
            modules: [
              { id: 'plcs-click-1',
                title: 'CLICK PLC Documentation',
                description: 'Links for specific functionalities of the Click PLC',
                blocks: [
                  {id: 'b1', type: 'markdown', content: '# Overview of CLICK PLCs\n\nCLICK PLCs are a line of programmable logic controllers designed for educational and light industrial applications. They offer a user-friendly interface and a range of features that make them ideal for learning about automation and control systems.'},
                  {id: 'b2', type: 'markdown', content: '## Official Click PLC tutorial documentation\n\nThe following is provided as-is by the CLICK PLC team, and is a great resource for learning about the various functionalities of the Click PLCs, and how to use them in your projects.\n\n - [**🟢CLICK Tutorial: Chapter 1**](https://cdn.automationdirect.com/static/manuals/c0userm/ch1.pdf): covers installing the software, creating a simple project, basic wiring of the PLC, uploading the project, and running the project.\n - [**🗒️CLICK Tutorial: Chapter 2**](https://cdn.automationdirect.com/static/manuals/c0userm/ch2.pdf): covers basic I/O, data types, power budgets, PLC operation, PLC specifications, and basic Ethernet usage.\n - [**🔌CLICK Tutorial: Chapter 3**](https://cdn.automationdirect.com/static/manuals/c0userm/ch3.pdf): covers installation and wiring guidelines.\n - [**📫CLICK Tutorial: Chapter 4**](https://cdn.automationdirect.com/static/manuals/c0userm/ch4.pdf): covers PLC communication protocols for communicating between two PLCs or communicating with other `modbus`, `serial`, or `ethernet` devices.\n - [**🪛CLICK Tutorial: Chapter 5**](https://cdn.automationdirect.com/static/manuals/c0userm/ch5.pdf): covers simple PLC maintanence proceedures.\n - [**🔧CLICK Tutorial: Chapter 5**](https://cdn.automationdirect.com/static/manuals/c0userm/ch6.pdf): covers PLC troubleshooting techniques.'},
                  {id: 'b3', type: 'markdown', content: '## Video Resources\n\nHere are some additional video resources & youtube playlists to help you further understand the Click PLCs and programming environment:'},
                  {id: 'b4', type: 'text', content: 'Modbus TCP/IP Communication with three click PLCs'},
                  {id: 'b5', type: 'video', content: 'https://www.youtube.com/embed/A0bt7Zyjm40?si=Wnwuz0IsYewsVM8M'},
                  {id: 'b6', type: 'text', content: 'Rundown of a Click PLC stoplight project, outlining the logic behind choosing which lights go green based on where the cars on, properly setting up timers, and using a counter.'},
                  {id: 'b7', type: 'video', content: 'https://www.youtube.com/embed/qoFeDVx15J4?si=VltbZ6BG9S90rqse'},
                ]
              },
            ]
          },

          { id: 'plcs-festo',
            title: 'FESTO Hardware Basics',
            emoji: '🏭',
            modules: [
              {id: `plcs-festo-1`,
                title: 'FESTO Power & Signals',
                description: 'The FESTO MPV-E-A12-M8 Power & signal distributor',
                blocks: [
                  {id: 'b1', type: 'markdown', content: '# Overview of the FESTO MPV-E-A12-M8\n\nTraditionally, in our labs, we\'ve constructed our \'power distributers\' using simple terminal blocks *(one with +24V, and another with 0V)*. However, the FESTO MPV-E-A12-M8 PLC offers a more integrated solution, combining power distribution with control capabilities in a single compact unit. This PLC is designed for educational and prototyping purposes, making it ideal for our lab environment.'},
                  {id: 'b2', type: 'image', content: 'plcs_festo_mpvea12m8_component.png', metadata: { alt: 'Image of FESTO MPV-E-A12-M8 Power & Signal Distributor', format: 'no-shadow'}},
                  {id: 'b3', type: 'markdown', content: 'The FESTO MPV-E-A12-M8 essentially serves as a signal breakout board, allowing us to easily connect a single field device to a single port (*these ports are called the sockets, or 3-port connectors*), and use the **multi-port connector** as a main line to connect to our PLC. Let\'s examine how this is done!'},
                  {id: 'b4', type: 'markdown', content: '# Pinout Diagram\n\nThe datasheet & the color codes for the wires of the multi-port connector are shown below.\n- Starting from the center of the datasheet, you\'ll notice there are a total of 15 pins on the **multi-pin connector**. Each of these pins connect to a specifically-colored wire within the main cable, shown in the second image. Within the first diagram, on either side of the multi-pin connector, each pin is layed out and described, which relates to... \n- The outer sides of the wiring diagram, where we find several **3-prong connections**, with ports labelled as 1, 3, and 4.\n- The **allocation** column shows how these two connection types are related, and describes their function, which will always be **`24V`**, **`0V`**, or a **`signal`** connection. \n\nFor example, notice that in the **allocation** column **`24 V DC`** and **`0 V`** are always shown for every circular connector, and always correspond to **`pin 1`** and **`pin 3`**. On the multi-pin connector, these always correspond to pin 13 and pin 14/15 respectively.\n\nThis means that we want to feed **`24V`** from our **CLICK Power Module** to **`pin 13`** of the multiport connector (which corresponds to the **white-green** wire within the main cable), and connect **`pin 14`** or **`15`** (white-yellow wire) to the **`0V`** terminal of our power supply.'},
                  {id: 'b5', type: 'image', content: 'plcs_festo_mpvea12m8.png', metadata: { alt: 'Pinout diagram of FESTO MPV-E-A12-M8', format: 'no-shadow'}},
                  {id: 'b6', type: 'image', content: 'plcs_festo_mpvea12m8_connector_pinout.png', metadata: { alt: 'Pinout diagram of FESTO MPV-E-A12-M8', format: 'no-shadow'}},
                  // Dropdown example of 0V connection
                  {id: 'b7', type: 'dropdown', content: 'Example of 0V Connection', children: [
                    {id: 'b7-1', type: 'markdown', content: 'If we wish to provide a 0V connection to ***all connected field devices***, we must provide a 0V connection to **`pin 14`** or **`pin 15`** of the multi-pin header.'},
                    {id: 'b7-2', type: 'image', content: 'plcs_festo_mpvea12m8_0V_example.png', metadata: { alt: 'Example of 0V Connection on FESTO MPV-E-A12-M8', format: 'no-shadow'}},
                    {id: 'b7-3', type: 'markdown', content: 'Now looking at the **color codes** of each of the core wires, we find that `pin 14` and `pin 15` correspond to `brown-green` and `white-yellow`, respectively. This means that we can connect either of these wires to the `0V` terminal of our power supply, and this will provide a 0V connection to all connected field devices.'},
                  ]},
                  {id: 'b8', type: 'markdown', content: '# 📺Video example of FESTO being integrated with a separate PLC\n\n*Note, the PLC and the Software are a little different than the Click suite we typically use. However, the pricniples of operations are largely the same!*'},
                  {id: 'b9', type: 'video', content: 'https://www.youtube.com/embed/eqwZvAop6L0?si=Y-F_yeXRj71PBX_N'},
                ]
              },

              { id: 'plcs-festo-2',
                title: 'FESTO MecLab Stations',
                description: 'Programming and controlling the FESTO MecLab stations for automation projects.',
                blocks: [
                  {id: 'b1', type: 'markdown', content: '# Overview of the FESTO MecLab Stations\n\nThe FESTO MecLab stations are modular training systems designed for hands-on learning in automation and mechatronics. Each station focuses on a specific aspect of industrial automation, such as pneumatics, hydraulics, or electrical control. For our purposes, we will be connecting the FESTO brand PLCs to the MecLab trainer systems and programming in their functionality.\n\n*Note, all FESTO sensors are PNP sensors, meaning the PLC wiring must be **`sinking`***.'},
                  {id: 'b2', type: 'image', content: 'plcs_festo_stations.png', metadata: { alt: 'Image of FESTO MecLab Trainer Station', format: 'no-shadow'}},
                  {id: 'b3', type: 'markdown', content: '## FESTO Conveyor Station\n\nThe conveyor station moves items along a belt and includes several sensors & actuators.\n - **Optical Sensor**: Detects the presence of objects on the conveyor. Typically wired as a digital input.\n - **Inductive Sensor**: Detects metallic objects *(i.e. objects that current can flow through)*.\n - **convayor Run Relay**: Digital output that turns on the conveyor system.\n - **convayor Reverse**: Toggles the direction of the conveyor belt.\n - **Solenoid-Controlled Block**: Lowers a \"blocker\" infront of the conveyor to push items off the belt.'},
                  {id: 'b4', type: 'markdown', content: '## FESTO Stacking Station\n\nThe stacking station can store both workpieces (lid and can) in the arrangement desired, and can separate them out for feeding. The workpieces stored in the tower magazine are pushed out by the horizontally positioned cylinder. The vertically positioned cylinder can then replicate a press-fit process (e.g. pressing a lid onto a can). All processes are controlled electro-pneumatically.\n - **Single-Acting Cylindar**: Pushed down when energized, automatically retracts via a spring return.\n - **Double-Acting Cylinder (Advance)**: Pushes the double-acting cylinder *forward* when energized. \n - **Double-Acting Cylinder (Retract)**: pushes the double-acting cylinder *backwards* when energized.'},
                  {id: 'b5', type: 'markdown', content: '## FESTO Handling Station\n\nHandling devices range from simple, two-axis handlers up to highly complex industrial robots with six axes. The handler in MecLab® consists of pneumatic cylinders with plain-bearing guides and has two axes. The workpiece is held by a gripper which is likewise pneumatically driven. This handler can transport the workpiece from one station to another or can join two workpiece halves together.\n - **Solenoid Valves**: 3 solenoid valves which use pneumatic pressure to control the movement of the handler.\n - **Magnetic Limit Switches**: 4 magnetic limit switches that detect the position of the handler and can be used to create feedback loops for precise control.\n - **Pneumatic Gripper**: A gripper that uses pneumatic vacuum pressure to grab and place objects'},
                  {id: 'b6', type: 'markdown', content: '# 🗒️FESTO MecLab Documentation\n\nSome great unofficial documentation can be found in the following youtube video series:'},
                  {id: 'b7', type: 'youtubeplaylist', content: 'https://www.youtube.com/embed/videoseries?si=du3SicmBOCem79gX&amp;list=PLUi5cdVq3wTBiJDOEKZuATPJBsYnzjkBx'},
                ]
              }
            ]
          },
          
        ]
      },


      // COURSE: Hydraulics & Fluid Power
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
            id: 'ai-mod-temp',
            title: 'Gradient Descent',
            description: 'Utilize gradient descent for optimizing machine learning models.',
            blocks: [
              { id: 'b1', type: 'markdown', content: '# Introduction to Gradient Descent\n\nGradient descent is an optimization algorithm used to minimize the cost function in machine learning models by iteratively adjusting the model parameters.\n\nLet\'s start by examining a model we\'d like to optimize:' },
              { id: 'b3', type: 'latex', content: 'f_\\theta(x) = \\theta_1x + sin(\\theta_2x)'},
              { id: 'b4', type: 'markdown', content: 'Here, we find that `theta_1` and `theta_2` are the parameters we want to optimize. We can use gradient descent to find the optimal values for these parameters that minimize our cost function. Recall that our **cost function** is defined as the MSE, or rather...' },
              { id: 'b5', type: 'latex', content: 'MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y_i})^2 \\space where \\space \\hat{y_i} = f_\\theta(x_i)' },
              { id: 'b6', type: 'markdown', content: 'where...'},
              { id: 'b7', type: 'latex', content: '\\hat{y_i} = f_\\theta(x_i)x' },
              { id: 'bv', type: 'video', content: 'https://www.youtube.com/embed/eI8M9MEA5lA?si=TCNQV2trdCHNY_T3' },
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
