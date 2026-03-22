
import { Category } from './types';

// To improve readability in VS Code, you can collapse all regions by pressing:
// Ctrl + K, then Ctrl + 0 (zero).

export const CATEGORIES: Category[] = [

  // CATEGORY: Mechatronics
  { id: 'mechatronics',
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
              { id: 'plcs-click-comm',
                title: 'CLICK PLC Communication Protocols',
                description: 'Overview of the modbus communication protocol for the Click PLC.',
                blocks: [
                  {id: 'b1', type: 'markdown', content: '# Overview of Modbus Protocol\n\nModbus is a communication protocol developed for industrial applications. It allows devices to communicate over a network, typically using serial communication (RS-232, RS-485) or Ethernet. The Click PLC supports Modbus TCP/IP for Ethernet communication and Modbus RTU for serial communication.'},
                  {id: 'b2', type: 'markdown', content: '## 📟↔💻Modbus TCP/IP\n\nModbus TCP/IP is a variant of the Modbus protocol that uses Ethernet for communication. It allows for faster data transfer and is commonly used in modern industrial applications. The Click PLC can be configured to communicate with other devices using Modbus TCP/IP, enabling integration with SCADA systems, HMIs, and other PLCs.'},
                  {id: 'b3', type: 'markdown', content: '## 📟↔📟Modbus RTU\n\nModbus RTU is a serial communication protocol that uses a master-slave architecture. It is commonly used for communication between PLCs and field devices such as sensors and actuators. The Click PLC can be configured to communicate with other devices using Modbus RTU, allowing for integration with a wide range of industrial equipment.'},
                  {id: 'b4', type: 'markdown', content: '# Click-to-Click with Modbus RTU\n\nTo allow two PLCs to talk to one another, the Modbus RTU protocal can be used by connecting two PLCs through the serial line, or **`port 3`**.\n When working with the **Modbus RTU Protocol**, all PLCs must serve as one of two roles: **Client** (*sometimes called master*) or **Server** (*sometimes called slave*).\n - The **Client PLC** initiates communication and sends requests to the server PLC, which responds to those requests. In a typical network, only one PLC can act as the client at a time.\n - The **Server PLC** listens for requests from the client and responds accordingly. Multiple server PLCs can be connected to a single client PLC, allowing for a network of devices to communicate with one another.'},
                  {id: 'b5', type: 'image', content: 'plcs_click_networking.png', metadata: { alt: 'Diagram of Click PLC Modbus TCP/IP and RTU Communication', format: 'no-shadow'}},
                  {id: 'b6', type: 'markdown', content: '## Choosing what Data to Send:\n\nData is exchanged between PLCs by a register-to-register basis. This means that the client PLC can read from or write to specific registers on the server PLC. For example, if the client PLC wants to read the value of a sensor connected to the server PLC, it would send a request to read from the register associated with that sensor. The server PLC would then respond with the current value of that register, allowing the client PLC to use that data in its control logic.\nModbus addresses have their **own unique register map**, which can be shown by opening the \`address picker\` and checking the \`Display Modbus Addresses\` checkbox.'},
                  {id: 'b7', type: 'image', content: 'plcs_click_networking_addressing.png', metadata: { alt: 'Diagram of Click PLC Modbus Register Addressing', format: 'no-shadow', maxWidth: 'full'}},
                  {id: 'b8', type: 'markdown', content: '## Modbus Communication Functions\n\nIn order to perform communication between two PLCs, the modbus settings ***must*** match between the two devices, save a signle setting called \`Node Address\`\n\n The **Node Address** is a unique identifier for each PLC on the Modbus network. It allows the client PLC to specify which server PLC it wants to communicate with. Each server PLC must have a unique Node Address to avoid conflicts on the network\n\n **All other settings** must be identical between the two PLCs to ensure proper communication. A few settings of note:\n - The \`Baudrate\` defines the speed at which the PLCs will transmit signals\n - The \`Parity\` setting ensures that the data integrity is maintained during transmission\n - The \`Stop Bits\` setting defines the end of a data packet\n - The \`Data Bits\` setting defines the size of each data packet.\n - The \`Time-out setting\` defines the maximum time the client PLC will wait for a response from the server PLC.'},
                  {id: 'b9', type: 'image', content: 'plcs_click_networking_comsetup.png', metadata: { alt: 'Diagram of Click PLC Modbus Communication Functions', format: 'no-shadow', maxWidth: 'full'} },
                  {id: 'b10', type: 'markdown', content: 'To actually send and recieve data, the **client PLC** will utilize the **\`Recieve\`** and **\`Send\`** instructions found in the **Instruction List**.'},
                  {id: 'b11', type: 'markdowntooltip', content: '## Recieving Data\n\nThe **\`Recieve\`** instruction allows the client PLC to read data from the server PLC. To correctly set up the recieve instruction, the client PLC must specify the following parameters:\n- The **Node Address** of the server PLC it wants to communicate with.\n- The **Function Code** that specifies the type of Modbus operation. This could be \`Reading a Coil\`, \`Reading an Input\`, \`Reading a Register\`, or \`Reading an input Register\`.\n- The **Starting Register Address** on the server PLC from which to begin reading data.\n- The **Number of Registers** to read from the server PLC. (i.e. how many registers after the starting register address should be read? This can be thought of as the size of the data packet being sent.)', metadata: {
                    'parts' : [
                      {
                        text: 'Reading a Coil',
                        blocks: [{type: 'markdown', content: 'Reads a single \`boolean\` value from a \`coil\` (*such as C1*).'}]
                      },
                      {
                        text: 'Reading an Input',
                        blocks: [{type: 'markdown', content: 'Reads a single \`boolean\` value from an \`input\` (*such as X1*).'}]
                      },
                      {text: 'Reading a Register', blocks: [{type: 'markdown', content: 'Reads a \`byte\` or \`word\` value from a \`register\` (*such as R1*).'}]},
                      {text: 'Reading an input Register', blocks: [{type: 'markdown', content: 'Reads a \`byte\` or \`word\` value from an \`input register\` (*such as IR1*). This is useful for sending over a **list** of several inputs (i.e. X1, X2, X3, ...)'}]}
                    ]
                  }},
                  {id: 'b12', type: 'image', content: 'plcs_click_networking_recievecmd.png', metadata: { alt: 'Diagram of Click PLC Recieve Command', format: 'no-shadow', maxWidth: 'full'}},
                  {id: 'b13', type: 'markdown', content: '## Sending Data\n\nThe **\`Send\`** instruction allows the client PLC to write data to the server PLC. The parameters are nearly identical to those of the **\`Recieve\`** instruction.\n\nBelow is an illustration of an example program that will take a piece of data from.'},
                  {id: 'b14', type: 'image', content: 'plcs_click_networking_lld.png', metadata: { alt: 'Diagram of Click PLC Send Command', format: 'no-shadow', maxWidth: 'full'}},
                  {id: 'b15', type: 'markdown', content: '## 📺Youtube Video Demonstration\n\nBelow is a youtube video demonstration showing how RS-485 can be used to communicate between two videos, as well as an elaboration on the \`status flags\` properties of the send and recieve commands.'},
                  {id: 'b16', type: 'video', content: 'https://www.youtube.com/embed/EySxKZjm6uE?si=hf8fRJxWRFEAXDxk'}
                ]
              },
              { id: 'plcs-click-misc',
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
            blocks: []
          },

          { id: 'h-mod-cont',
            title: 'Continuity Equation',
            description: 'Understanding the principle of mass conservation in fluid flow.',
            blocks: [
              {id: 'h-mod-cont-1', type: 'markdown', content: '# Continuity Equation\n\nThe continuity equation is a fundamental principle in fluid dynamics that describes the conservation of mass in a fluid flow. It states that the mass flow rate of a fluid must remain constant from one cross-section of a pipe to another, assuming incompressible flow. '},
              {id: 'h-mod-cont-2', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: 'A_1 ', blocks: [{id: 'a1', type: 'markdown', content: '**A1** is the cross-sectional area of the pipe at point 1.'}]},
                  {expression: 'v_1 ', blocks: [{id: 'v2', type: 'markdown', content: '**v1** is the velocity of the fluid at the point of interest.'}]},
                  {expression: ' = ', blocks: []},
                  {expression: 'A_2 ', blocks: [{id: 'c3', type: 'markdown', content: '**A2** is the cross-sectional area of the pipe at point 2.'}]},
                  {expression: 'v_2', blocks: [{id: 'v3', type: 'markdown', content: '**v2** is the velocity of the fluid at the point of interest.'}]}
                ]
              }}
            ]
          },

          { id: 'h-mod-3', 
            title: 
            'Bernoulli\'s Equation', 
            description: 'Understanding the principles energy conservation.', 
            blocks: [
              {id: 'bern-1', type: 'markdown', content: '# Bernoulli\'s Equation\n\nBernoulli\'s equation is a fundamental principle in fluid dynamics that describes the behavior of a fluid under varying conditions of flow and height. At it\'s core, Bernoulli\'s Equation compares a fluid\'s **pressure**, **velocity**, and **height** energies at two different points in a system. '},
              {id: 'bern-2', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: '\\frac{P_1}{\\gamma}', blocks: [{id: 'p1', type: 'text', content: 'The pressure energy per unit weight at point 1.'}, {id: 'p2', type: 'markdown', content: '**P** is the pressure at the point of interest, and **γ** is the specific weight of the fluid. This term represents the potential energy stored in the fluid due to its pressure.'}]},
                  {expression: ' + ', blocks: []},
                  {expression: '\\frac{v_1^2}{2g}', blocks: [{id: 'v1', type: 'text', content: 'The velocity energy per unit weight at point 1.'}, {id: 'v2', type: 'markdown', content: '**v** is the velocity of the fluid at the point of interest, and **g** is the acceleration due to gravity. This term represents the kinetic energy of the fluid.'}]},
                  {expression: ' + '},
                  {expression: ' h_1 ', blocks: [{id: 'h1', type: 'text', content: 'The height energy per unit weight at point 1.'}, {id: 'h2', type: 'markdown', content: '**h** is the height of the fluid at the point of interest. This term represents the potential energy of the fluid due to its elevation.'}]},
                  {expression: ' = ', blocks: []},
                  {expression: '\\frac{P_2}{\\gamma}', blocks: [{id: 'p3', type: 'text', content: 'The pressure energy per unit weight at point 2.'}, {id: 'p4', type: 'markdown', content: '**P** is the pressure at the point of interest, and **γ** is the specific weight of the fluid. This term represents the potential energy stored in the fluid due to its pressure.'}]},
                  {expression: ' + ', blocks: []},
                  {expression: '\\frac{v_2^2}{2g}', blocks: [{id: 'v3', type: 'text', content: 'The velocity energy per unit weight at point 2.'}, {id: 'v4', type: 'markdown', content: '**v** is the velocity of the fluid at the point of interest, and **g** is the acceleration due to gravity. This term represents the kinetic energy of the fluid.'}]},
                  {expression: ' + '},
                  {expression: ' h_2 ', blocks: [{id: 'h3', type: 'text', content: 'The height energy per unit weight at point 2.'}, {id: 'h4', type: 'markdown', content: '**h** is the height of the fluid at the point of interest. This term represents the potential energy of the fluid due to its elevation.'}]}
                ]
              }}
            ] 
          }

        ],
        moduleCategories: [
          { id: 'h-cat-1',
            title: 'Introduction',
            emoji: '⚠️',
            modules: [

            ]
          },
          
          { id: 'h-basics',
            title: 'Mathematics',
            emoji: '📏',
            modules: [
              { id: 'h-basics-quant',
                title: 'Basic Hydraulic Quantities',
                description: 'Overview of the basic quantities used in hydraulics and physics.',
                blocks: [

                ]
              },

              { id: 'h-basics-pascal',
                title: 'Pascal\'s Law',
                description: 'Understanding Pascal\'s Law and its applications in hydraulic systems.',
                blocks: [

                ]
              },

              { id: 'h-basic-bernoullis',
                title: 'Bernoulli\'s Equation',
                description: 'Understanding Bernoulli\'s Equation and its applications in fluid dynamics.',
                blocks: [

                ]
              }
            ]
          },

          { id: 'h-circuits',
            title: 'Hydraulic Circuits',
            emoji: '🔩',
            modules: [
              
            ],
          },

          { id: 'h-valves',
            title: 'Hydraulic Valves',
            emoji: '🔧',
            modules: [
              { id: 'h-valves-manual-cutoff',
                title: 'Manual On/Off Valve',
                description: 'Overview of a manual on/off cut valve used in hydraulic systems.',
                blocks: [
                  { id: 'v1', type: 'markdown', content: '# Manual On/Off Cut Valve\n\nA manual on/off cut valve is a fundamental component in hydraulic systems. It is used to start or stop the flow of fluid through a circuit by physically turning a handle or lever.' },
                  { id: 'v2', type: 'model3d', title: 'Manual On/Off Cut Valve', content: 'valve_onoff_manual_cut.glb', metadata: { height: 450, autoRotate: true } },
                ]
              }
            ],
          }
        ]
      },

      // COURSE: Microcontrollers & Embedded Systems
      { id: 'microcontrollers',
        title: 'Microcontrollers & Embedded Systems',
        emoji: '🖥️',
        description: 'Programming microcontrollers for real-time control and automation.',
        modules: [],
        moduleCategories: [
          { id: 'mc-cat-1',
            title: 'Getting Started with Microcontrollers',
            emoji: '🛠️',
            modules: []
          },

          { id: 'mc-cat-2',
            title: 'Microcontroller Hardware',
            emoji: '🚀',
            modules: []
          },

          { id: 'mc-cat-3',
            title: 'Microcontroller Programming: C/C++',
            emoji: '💻',
            modules: []
          },

          { id: 'mc-cat-4',
            title: 'Microcontroller Programming: Python',
            emoji: '🐍',
            modules: []
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

      // COURSE: Data Science and Preprocessing
      { id: 'ds-processing',
        title: 'Data Structures and Pre-Processing',
        emoji: '🌳',
        description: 'Efficiently handling sensor data and decision trees in real-time.',
        modules: [],
        moduleCategories: [
          { id: 'robai-visualization',
            title: 'Data Visualization for AI & Robotics',
            emoji: '📊',
            modules: [
              { id: 'robai-vis-1',
                title: 'Matplotlib & basic plotting',
                description: 'Learn how to use Matplotlib to create basic plots.',
                blocks: [

                ]
              },

              { id: 'robai-vis-2',
                title: 'Advanced Visualization with Seaborn',
                description: 'Create more complex and informative visualizations using Seaborn.',
                blocks: [

                ]
              },

              { id: 'robai-vis-3',
                title: 'Interactive Visualizations with Plotly',
                description: 'Build interactive plots and dashboards using Plotly.',
                blocks: [

                ]
              }
            ]
          },

          { id: 'robai-algos',
            title: 'A Brief Introduction to Machine Learning Algorithms',
            emoji: '🧠',
            modules: [
              // TOPIC: Gradient Descent
              { id: 'robai-algo-gd',
                title: 'Gradient Descent',
                description: 'Utilize gradient descent for optimizing machine learning models.',
                blocks: [
                  { id: 'b1', type: 'markdown', content: '# Introduction to Gradient Descent\n\nGradient descent is an optimization algorithm used to minimize the cost function in machine learning models by iteratively adjusting the model parameters.\n\nLet\'s start by examining a model we\'d like to optimize:' },
                  { id: 'b2', type: 'latextooltip', content: '', metadata: {
                    displayMode: true,
                    parts: [
                      { expression: 'f_\\theta(x) = ' },
                      {
                        expression: '\\theta_1',
                        blocks: [
                          { id: 'theta1-1', type: 'text', content: 'θ₁ is the first parameter we want to optimize - it controls the linear scaling of x.' },
                          { id: 'theta1-2', type: 'note', content: 'This parameter is updated during each iteration of gradient descent.' }
                        ]
                      },
                      { expression: 'x + ' },
                      {
                        expression: '\\sin(',
                        blocks: [
                          { id: 'sin-1', type: 'text', content: 'The sine function introduces non-linearity to our model, allowing it to fit more complex patterns.' },
                          { id: 'sin-2', type: 'latex', content: '\\frac{d}{dx}\\sin(\\theta_2x) = \\theta_2\\cos(\\theta_2x)', metadata: { displayMode: true } }
                        ]
                      },
                      {
                        expression: '\\theta_2',
                        blocks: [
                          { id: 'theta2-1', type: 'text', content: 'θ₂ is the second parameter - it controls the frequency of the sine wave.' },
                          { id: 'theta2-2', type: 'markdown', content: '**Initial value**: Randomly initialized\n\n**Update rule**: θ₂ = θ₂ - α·∂J/∂θ₂' }
                        ]
                      },
                      { expression: 'x)' }
                    ]
                  }},
                  { id: 'b4', type: 'markdown', content: 'Hover directly over the colored terms in the equation above to see detailed explanations! Notice how `theta_1` and `theta_2` are the parameters we want to optimize. We can use gradient descent to find the optimal values for these parameters that minimize our cost function. Recall that our **cost function** is defined as the MSE, or rather...' },
                  { id: 'b5', type: 'latex', content: 'MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y_i})^2 \\space where \\space \\hat{y_i} = f_\\theta(x_i)' },
                  { id: 'b6', type: 'markdown', content: 'Now let\'s implement this in code. Here\'s a simple gradient descent update step:'},
                  { id: 'b7', type: 'codetooltip', content: 'theta = theta - learning_rate * gradient', metadata: {
                    language: 'python',
                    parts: [
                      {
                        text: 'theta',
                        blocks: [
                          { id: 'theta-code-1', type: 'text', content: 'The parameter vector we\'re optimizing (θ₁ and θ₂ in our case).' },
                          { id: 'theta-code-2', type: 'note', content: 'Updated iteratively to minimize the cost function.' }
                        ]
                      },
                      {
                        text: 'learning_rate',
                        blocks: [
                          { id: 'lr-1', type: 'markdown', content: '**Learning Rate (α)**: Controls how big each step is.\n- Too large: May overshoot the minimum\n- Too small: Slow convergence' },
                          { id: 'lr-2', type: 'text', content: 'Typical values: 0.001 to 0.1' }
                        ]
                      },
                      {
                        text: 'gradient',
                        blocks: [
                          { id: 'grad-1', type: 'text', content: 'The gradient ∇J(θ) is the vector of partial derivatives of the cost function with respect to each parameter.' },
                          { id: 'grad-2', type: 'latex', content: '\\nabla J(\\theta) = \\begin{bmatrix} \\frac{\\partial J}{\\partial \\theta_1} \\\\ \\frac{\\partial J}{\\partial \\theta_2} \\end{bmatrix}', metadata: { displayMode: true } }
                        ]
                      }
                    ]
                  }},
                  { id: 'b8', type: 'markdown', content: 'Hover directly over the terms in the code above to see detailed explanations! The gradient tells us which direction to move our parameters to reduce the cost.' },
                  { id: 'b9', type: 'video', content: 'https://www.youtube.com/embed/eI8M9MEA5lA?si=TCNQV2trdCHNY_T3' },
                ]
              },

              // TOPIC: Clustering
              { id: 'robai-algo-cluster',
                title: 'Clustering Algorithms',
                description: 'Applying clustering techniques for unsupervised learning in robotics.',
                blocks: [
                  { id: 'b1', type: 'markdown', content: '# Introduction to Clustering Algorithms\n\nClustering algorithms are a type of unsupervised learning technique used to group similar data points together based on their features. These algorithms are particularly useful in robotics for tasks such as object recognition, anomaly detection, and environment mapping.' },
                  { id: 'b2', type: 'markdown', content: '## K-Means Clustering\n\nK-Means is a popular clustering algorithm that partitions the data into K distinct clusters based on feature similarity. The algorithm works by initializing K centroids randomly, assigning each data point to the nearest centroid, and then updating the centroids based on the mean of the assigned points. This process is repeated until convergence.' },
                  { id: 'b3', type: 'markdown', content: 'The K-Means algorithm can be visualized as follows:\n\n1. ' },
                  { id: 'b4', type: 'plotly', title: 'Interactive K-Means Animation', content: 'kmeans_animation.json', metadata: { height: 700, showModeBar: true } },
                  // { id: 'b3', type: 'markdown', content: '## DBSCAN (Density-Based Spatial Clustering of Applications with Noise)\n\nDBSCAN is a density-based clustering algorithm that groups together points that are closely packed together, while marking points that lie alone in low-density regions as outliers. It is particularly effective for clustering data with noise and varying densities.' },
                  
                ]
              },

              // TOPIC: Decision Trees
              { id: 'robai-algo-dt',
                title: 'Decision Trees',
                description: 'Implementing decision trees for classification tasks in robotics.',
                blocks: [
                  { id: 'b1', type: 'markdown', content: '# Introduction to Decision Trees\n\nDecision trees are a type of supervised learning algorithm used for classification and regression tasks. They work by recursively splitting the data into subsets based on feature values, creating a tree-like structure of decisions.' },
                  { id: 'b2', type: 'markdown', content: '## Entropy\n\nOne common metric used to determine the best splits in a decision tree is **entropy**, which measures the impurity of a dataset. The formula for entropy is given by:' },
                  { id: 'b3', type: 'latextooltip', content: '', metadata: {
                    displayMode: true,
                    parts: [
                      { expression: 'H', blocks: [{id: 'H', type: 'markdown', content: '\`H\` is the entropy of the dataset, which measures the impurity or disorder of the data.'}] },
                      { expression: '('},
                      { expression: 'S', blocks: [{id: 'S', type: 'markdown', content: '\`S\` is the set of training examples at a given node.'}] },
                      { expression: ')', blocks: [] },
                      { expression: '= -'},
                      { expression: '\\sum_{i=1}^{k}', blocks: [{id: 'sum', type: 'markdown', content: 'Effectively a **for** loop where we *add the results together*.\nHere, we itterate over all **labels** in the dataset and *perform the following operation...'}] },
                      { expression: 'p_i \\log_2(p_i)', blocks: [{id: 'pi', type: 'latex', content: 'p_i = \\frac{|l_i|}{|S|}'}, {id: 'pi-2', type: 'markdown', content: '\`p_i`\ is a ratio of label i to the total number of examples (*or datapoints*) in S. For example, if we had a dataset where the \`labels\` column was...\n\`[\'high\',\'high\',\'low\']\`\n, then \`p_{high} = \\frac{2}{3}\` and \`p_{low} = \\frac{1}{3}\`.'}] },
                    ]
                  }},
                  {id: 'b4', type: 'markdown', content: 'The value we get for entropy corresponds directly to how pure or impure our dataset is. Specifically, if the **\`labels\`** of our dataset are all the same or vary wildly. A few specific examples:\n- If all labels are the same (e.g. all examples are class A), then the entropy is 0, indicating a pure dataset.\n- If the labels are evenly distributed (e.g. 50% class A and 50% class B), then the entropy is at its maximum, indicating a highly impure dataset.'},
                  { id: 'b5', type: 'markdown', content: '## Information Gain\n\n However, entropy simply tells us if a specific dataset is pure or impure. To decide the best feature to split on, we use **information gain**, which measures the reduction in entropy after a dataset is split on a feature.\n\n **Information Gain** is a **per-attribute** calculation - meaning that we calculate the Information Gain for **each attribute** separately and choose to split on the one with the most information gain.' },
                  {id: 'b5', type: 'latextooltip', content: '', metadata: {
                    displayMode: true,
                    parts: [
                      { expression: 'IG', blocks: [{id: 'IG', type: 'markdown', content: '\`IG\` stands for Information Gain, which measures the reduction in entropy after splitting a dataset on a specific feature.'}] },
                      { expression: '(', blocks: [] },
                      { expression: 'S', blocks: [{id: 'S', type: 'markdown', content: '\`S\` is the set of training examples at a given node. *i.e. your dataset*'}] },
                      { expression: ',', blocks: [] },
                      { expression: 'A', blocks: [{id: 'A', type: 'markdown', content: '\`A\` is the feature we are evaluating for the split.'}] },
                      { expression: ') = ', blocks: [] },
                      { expression: 'H(S)', blocks: [{id: 'HS', type: 'markdown', content: '\`H(S)\` is the entropy of the original dataset before the split. *This is what was calculated in the previous equation*'}] },
                      { expression: '- \\sum_{v \\in Values(A)}', blocks: [{id: 'sum2', type: 'markdown', content: 'Effectively a **for** loop where we *add the results together*.\nHere, we itterate over all **possible values** of the **feature A** (not the labels but the feature itself!) and *perform the following operation...*'}] },
                      { expression: '\\frac{|S_v|}{|S|}', blocks: [{id: 'Sv', type: 'markdown', content: '\`|S_v|\` is the **number of data points (rows) that have the value \`v\`** in attribute \`A\`. \`|S|\` is the total number of data points in the dataset. This fraction represents the proportion of the dataset that falls into this subset.'}]},
                      { expression: 'H(S_v)', blocks: [{id: 'HSv', type: 'markdown', content: '\`H(S_v)\` is the entropy of the subset of the dataset where attribute \`A\` has value \`v\`. This measures the impurity of this subset.'}, {id: 'HSv2', type: 'note', content: 'Essentially, we want to crop our dataset down into a smaller subset where attribute \`A\` has a specific value of \`v\`, then re-run our entropy calculation on *just* that subset.'}]},
                    ]
                  }},
                ]
              }
            ],
          }
        ]
      },

      // COURSE: Architecture of Robots
      { id: 'robot-arch', 
        title: 'Architecture of Robots', 
        emoji: '🏛️', 
        description: 'Kinematics, Structural Design, and Principles of Robotics.', 
        modules: [
          { id: 'robai-arch-intro',
            title: 'Introduction to Robot Architecture',
            description: '',
            blocks: [
              {id: 'b1', type: 'markdown', content: '# What is Robot Architecture?\n\nRobot architecture refers to the overall design and structure of a robotic system, encompassing the \`mathematical representation\`, the \`physical construction\`, and the \`control systems\` which make up the robot. It involves the arrangement of sensors, actuators, processors, and communication interfaces to enable the robot to perform its intended tasks effectively.\n\nIn this class, we will focus both on the **mathematical representation** of robotic systems (i.e. how to model a robot\'s structure and movement using mathematical tools) as well as the **physical design** of robotic systems (i.e. how to choose and arrange components to build a functional robot).'},
              {id: 'b2', type: 'markdown', content: '# Outline of the Course\n\n 1. **Foundations of Spatial Architecture**: Configuration space, Rigid Bodies, and Transformations. \n 2. **Kinematics of Robotic Systems**: Forward Kinematics, Jacobian Matrix, and Inverse Kinematics. \n 3. **Dynamics & Planning**: Dynamics of Open Chains, Trajectory Planning, and Motion Planning. \n 4. **Control Systems for Robotics**: Various control strategies for robots.'},
              {id: 'b3', type: 'markdown', content: '# Resources\n\n The content in this course is heavily sourced from the fantastic book **[📖Modern Robotics](https://modernrobotics.org/)**, written by *Kevin M. Lynch* and *Frank C. Park*.'}
            ]
          }
        ],
        moduleCategories: [

          { id: 'robai-arch-intro',
            title: 'Foundations of Spatial Architecture',
            emoji: '👍',
            modules: [
              { id: 'robai-arch-intro-intro',
                title: 'Configuration Space',
                description: 'Understanding the configuration space (C-space) for robot motion planning.',
                blocks: [
                  {id: 'b1', type: 'markdowntooltip', content: '# Rigid Bodies\n\nIn the broadest terms, robots can best be thought of as one or more solid objects connected together. We refer to these solid objects as **rigid bodies**, and the connections between them as **\`joints\`**.', metadata: 
                    { 'parts' : [
                      {
                        text: 'rigid bodies',
                        blocks: [{type: 'markdown', content: 'A single solid object that does not deform under stress. In robotics, we model components like arms, grippers, and sensors as rigid bodies. *Essentially, anything that maintains its shape under normal operating conditions.*'}]
                      },
                      
                    ]
                  }},

                  { id: 'b2', type: 'markdown', content: '# Robot Joints\n\n- Revolute Joint (R)\n - Prismatic Joint (P)\n- Helical Joint (H) (Screw Joint)\n- Cylindrical Joint (C)\n- Universal Joint (U)\n- Spherical Joint (S) (Ball-and-Socket Joint)'}
                ]
              },

              { id: 'robai-arch-intro-rbs',
                title: 'Rigid Bodies & Rotation Matricies',
                description: 'Modeling robot components as rigid bodies and using rotation matrices for orientation.',
                blocks: [
                
                ]
              },

              { id: 'robai-arch-intro-trans',
                title: 'Homogeneous Transformations',
                description: 'Combining rotation and translation in homogeneous transformation matrices.',
                blocks: [
                
                ]
              },
            ]
          },

          { id: 'robai-arch-kinematics',
            title: 'Kinematics of Robotic Systems',
            emoji: '🦾',
            modules: [
              { id: 'robai-arch-kinematics-forward',
                title: 'Forward Kinematics',
                description: 'Calculating the position and orientation of the robot\'s end-effector from joint parameters.',
                blocks: [
              
                ]
              },

              { id: 'robai-arch-kinematics-jacobian',
                title: 'Jacobian Matrix',
                description: 'Relating joint velocities to end-effector velocities using the Jacobian matrix.',
                blocks: [

                ]
              },

              { id: 'robai-arch-kinematics-inverse',
                title: 'Inverse Kinematics',
                description: 'Determining the joint parameters needed to achieve a desired end-effector position and orientation.',
                blocks: [

                ]
              }
            ]
          },

          { id: 'robai-arch-dyn',
            title: 'Dynamics & Planning',
            emoji: '⚽',
            modules: [
              { id: 'robai-arch-dyn-open',
                title: 'Dynamics of Open Chains',
                description: 'Modeling the dynamics of robotic arms and manipulators with open kinematic chains.',
                blocks: [

                ]
              },

              { id: 'robai-arch-dyn-traj',
                title: 'Trajectory Planning',
                description: 'Planning and optimizing the path of a robot\'s end-effector.',
                blocks: [

                ]
              },

              { id: 'robai-arch-dyn-mp',
                title: 'Motion Planning',
                description: 'Algorithms for motion planning in complex environments, including obstacle avoidance.',
                blocks: [

                ]
              },
            ]
          },

          { id: 'robai-arch-control',
            title: 'Control Systems for Robotics',
            emoji: '🎮',
            modules: [
              { id: 'robai-arch-control-feedback',
                title: 'Feedback Control',
                description: 'Designing feedback control systems for stable and responsive robot behavior.',
                blocks: [

                ]
              },

              { id: 'robai-arch-control-march',
                title: 'Modern Robotic Architecture',
                description: 'Exploring modern robotic architectures and their applications in industry.',
                blocks: [

                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // CATEGORY: Computer Science
  { id: 'computer-science',
    title: 'Computer Science',
    emoji: '💻',
    description: 'The foundation of modern software systems.',
    color: 'emerald',
    courses: [

      // COURSE: Java 1
      { id: 'java-1', 
        title: 'Intro to Java: Foundations', 
        emoji: '☕', 
        description: 'Variables, loops, and control flow in the Java language.', 
        modules: [
          { id: 'java-1-1', 
            title: 'Lecture Resources', 
            description: 'Slides and notes from the introductory Java lectures.',
            blocks: [
              { id: 'b1', type: 'markdown', content: '# Java Basics\n\nThis module covers the fundamental concepts of Java programming.' },
              { id: 'b2', type: 'note', content: 'These videos are brought to you by Professor Frank Shang from Edmonds College.'},
              { id: 'b4', type: 'youtubeplaylist', content: 'https://www.youtube.com/embed/videoseries?si=SHPjut47HSx7CuMv&amp;list=PL0VQczlwfp6mrGJRBqmi9hB9QJJCl4Ck3'}
            ]
          }
        ] 
      },

      // COURSE: Java 2
      { id: 'java-2', 
        title: 'Intro to Java: Objects', 
        emoji: '📦', 
        description: 'Object-oriented programming, classes, and inheritance.', 
        modules: [

        ] 
      },

      // COURSE: Java 3
      { id: 'java-3',
        title: 'Intro to Java: Advanced',
        emoji: '🔥', description: 'Generics, streams, and functional interfaces.',
        modules: [

        ] 
      },
      
      // Course: Java Data Structures
      { id: 'java-ds', 
        title: 'Data Structures in Java', 
        emoji: '🧬', 
        description: 'Linked lists, hash maps, and sorting algorithms.', 
        modules: [],
        moduleCategories: [

        ] 
      },
    ]
  }

];
