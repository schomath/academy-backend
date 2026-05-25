
import { text } from 'stream/consumers';
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
        modules: [],
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

              { id: 'h-math-continuity',
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
                  {id: 'bern-1', type: 'markdown', content: '# Bernoulli\'s Equation\n\nBernoulli\'s equation is a fundamental principle in fluid dynamics that describes the behavior of a fluid under varying conditions of flow and height. At it\'s core, Bernoulli\'s Equation compares a fluid\'s **pressure**, **velocity**, and **height** energies at two different points in a system. '},
              {id: 'bern-2', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: '\\frac{P_1}{\\gamma}', blocks: [{id: 'p1', type: 'text', content: 'The pressure energy per unit weight at point 1.'}, {id: 'p2', type: 'markdown', content: '**P** is the pressure at the point of interest, and **γ** is the specific weight of the fluid. This term represents the potential energy stored in the fluid due to its pressure.'}]},
                  {expression: ' + ', blocks: []},
                  {expression: '\\frac{v_1^2}{2g}', blocks: [{id: 'v1', type: 'text', content: 'The velocity energy per unit weight at point 1.'}, {id: 'v2', type: 'markdown', content: '**v** is the velocity of the fluid at the point of interest, and **g** is the acceleration due to gravity. This term represents the kinetic energy of the fluid.'}]},
                  {expression: ' + '},
                  {expression: ' h_1 ', blocks: [{id: 'h1', type: 'text', content: 'The height energy per unit weight at point 1.'}, {id: 'h2', type: 'markdown', content: '**h** is the height of the fluid at the point of interest. This term represents the potential energy of the fluid due to its elevation.'}]},
                  {expression: ' + '},
                  {expression: 'H_p', blocks: [{id: 'hp1', type: 'text', content: 'The head added to the system by a pump.'}, {id: 'hp2', type: 'markdown', content: '**Hp** is the head added to the system by a pump. This term represents the energy added to the fluid by a pump, which can increase the pressure, velocity, or height of the fluid.'}]},
                  {expression: ' - '},
                  {expression: 'H_m', blocks: [{id: 'hm1', type: 'text', content: 'The head lost from the system due to a motor.'}, {id: 'hm2', type: 'markdown', content: '**Hm** is the head lost from the system due to a motor (such as a piston). This term represents the energy extracted from the fluid by a motor, which can decrease the pressure, velocity, or height of the fluid.'}]},
                  {expression: ' - '},
                  {expression: 'H_l', blocks: [{id: 'hl1', type: 'text', content: 'The head lost from the system due to friction.'}, {id: 'hl2', type: 'markdown', content: '**Hl** is the head lost from the system due to friction. This term represents the energy lost from the fluid due to frictional forces as it flows through pipes, fittings, and other components.'}]},
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
          // { id: 'mc-start',
          //   title: 'Getting Started with Microcontrollers',
          //   emoji: '🛠️',
          //   modules: []
          // },

          { id: 'mc-hardware',
            title: 'Microcontroller Hardware',
            emoji: '🚀',
            modules: [
              { id: 'mc-hw-gen', 
                title: 'General Makeup of a Microcontroller',
                description: 'Overview of the Raspberry Pi Pico microcontroller, its features, and applications.',
                blocks: [
                  { id: 'mc-hw-mu-1', type: 'markdown', content: '# What is a Microcontroller?\n\nA microcontroller is a compact integrated circuit designed to govern a specific operation in an embedded system. It typically includes a processor, memory, and input/output peripherals on a single chip.' },

                  { id: 'mc-hw-mu-2', type: 'image', content: 'mc_hw_rp2040die.png', metadata: { alt: 'Image of Raspberry Pi RP2040 Microcontroller Die', format: 'no-shadow'}},

                  { id: 'mc-hw-mu-10', type: 'image', content: 'mc_hw_just_chip.png', metadata: { alt: 'Image of Raspberry Pi RP2040 Microcontroller Chip', format: 'no-shadow'}},
                ]
              },

              { id: 'mc-hw-pico',
                title: 'Raspberry Pi Pico',
                description: 'Overview of the Raspberry Pi Pico microcontroller, its features, and applications.',
                blocks: [
                  { id: 'mc-hw-pico-1', type: 'markdown', content: '# Raspberry Pi Pico\n\nThe Raspberry Pi Pico is a low-cost, high-performance microcontroller board based on the RP2040 microcontroller chip. It features:\n\n- A dual-core ARM Cortex-M0+ processor\n- 264KB of RAM\n- support for up to 16MB of external flash memory. \n\nThe Pico is designed for a wide range of applications, including embedded systems, IoT projects, and educational purposes.' },

                  { id: 'mc-hw-pico-2', type: 'image', content: 'mc_hw_pico_overview.png', metadata: { alt: 'Image of Raspberry Pi Pico Microcontroller Board', format: 'no-shadow'}},

                ]
              },

              {
                id: 'mc-hw-pico-IO',
                title: 'Raspberry Pi Pico Inputs \& Outputs',
                description: 'Overview of the input and output capabilities of the Raspberry Pi Pico microcontroller.',
                blocks: [
                  { id: 'mc-hw-pico-io-1', type: 'markdown', content: '# Raspberry Pi Pico I/O Capabilities\n\nThe Raspberry Pi Pico offers a variety of input and output options, including:\n\n- **GPIO Pins**: 26 multi-function GPIO pins that can be used for digital input/output, PWM, I2C, SPI, and UART communication.\n- **Analog Inputs**: 3 ADC channels for reading analog signals.\n- **USB**: A USB 1.1 controller for communication with a host computer or other USB devices.\n- **Communication Protocols**: Support for I2C, SPI, and UART communication protocols.' },

                  { id: 'mc-hw-pico-io-2', type: 'image', content: 'mc_hw_pico_pinout.png', metadata: { alt: 'Pinout diagram of Raspberry Pi Pico Microcontroller Board', format: 'no-shadow'}},

                  { id: 'mc-hw-pico-io-3', type: 'note', content: 'The gray blocks refer to the pin location on the breakout board - ***and mean nothing for programming the controller!***. When programming, we typically refer to pins by their **GPIO number** (i.e. GP0, GP1, GP2, ...), which is shown in the green boxes.'},
                ]
              }
            ]
          },

          { id: 'mc-programming',
            title: 'Microcontroller Programming: C/C++',
            emoji: '💻',
            modules: [

              // { id: 'mc-prog-terminology',
              //   title: 'Programming Terminology',
              //   description: 'Key programming concepts and terminology for microcontroller development.',
              //   blocks: [
              //     { id: 'mc-prog-term-1', type: 'markdown', content: '# Key Programming Concepts\n\nWhen programming microcontrollers, there are several key concepts and terminologies that are important to understand:\n\n- **Variable**: A storage location in memory that can hold a value. Variables have a name, a data type, and a value.\n- **Data Type**: The type of data that a variable can hold (e.g., `int`, `float`, `boolean`).\n- **Function**: A block of code that performs a specific task. Functions can take input parameters and return a value.\n- **Control Structures**: Constructs that control the flow of the program (e.g., `if` statements, loops).\n- **Library**: A collection of pre-written code that provides additional functionality for your program.' }
              //   ]
              // },

              { id: 'mc-prog-anat',
                title: 'Anatomy of a Microcontroller Program',
                description: 'Understanding the structure and components of a typical microcontroller program.',
                blocks: [
                  { id: 'mc-prog-anat-1', type: 'markdown', content: 'A typical microcontroller program consists of several key components that work together to control the behavior of the microcontroller. These components include:\n4. **Loop Function**: This is another special function that runs repeatedly after the setup function has completed. It contains the main logic of the program and is where you would typically read sensor data, make decisions, and control actuators.'
                  },

                  { id: 'mc-prog-anat-2a', type: 'note', content: 'Don\'t worry about the actual code itself for now - just appriciate the general structure of this program!'},

                  { id: 'mc-prog-anat-3', type: 'markdown', content: '## Preprocessor Directives\n\nThese are lines of code that start with `#` and are used to include libraries or define constants. For example, `#include <Servo.h>` is a common preprocessor directive that includes a library containing functions to control **servo motors**.'},

                  { id: 'mc-prog-anat-3b', type: 'codetooltip', content: '#include <Servo.h>\n#define GREEN_LED_PIN 13', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: '#include <Servo.h>', blocks: [{ id: 'mc-cat-3-3-anat-tip-0', type: 'markdown', content: 'This line of code is a preprocessor directive that tells the compiler to include the Servo library, which contains functions for controlling servo motors.'}]},
                      { text: '#define GREEN_LED_PIN 13', blocks: [{ id: 'mc-cat-3-3-anat-tip-1', type: 'markdown', content: 'This line of code is a preprocessor directive that defines a constant named GREEN_LED_PIN with a value of 13. This means that anywhere in the code where GREEN_LED_PIN is used, it will be replaced with the value 13.'}]}
                    ]
                  }},

                  { id: 'mc-prog-anat-4', type: 'markdown', content: '## Global Variables\n\nThese are variables that are declared outside of any function and can be accessed from anywhere in the program. They are often used to store values that need to be shared across multiple functions.'},

                  { id: 'mc-prog-anat-4b', type: 'codetooltip', content: 'char my_favorite_letter = \'m\';\nint my_yellow_led = 15;', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'char my_favorite_letter = \'m\';', blocks: [{ id: 'mc-cat-3-3-anat-tip-2', type: 'markdown', content: 'This line declares a global variable named my_favorite_letter and initializes it with the value \'m\'.'}]},
                      { text: 'int my_yellow_led = 15;', blocks: [{ id: 'mc-cat-3-3-anat-tip-3', type: 'markdown', content: 'This line declares a global variable named my_yellow_led and initializes it with the value 15, which is typically used to represent a pin number on the microcontroller.'}]}
                    ]
                  }},

                  { id: 'mc-prog-anat-5', type: 'markdown', content: '## Setup Function\n\nThis is a special function that runs once when the microcontroller is powered on or reset. It is typically used to initialize variables, set pin modes, and perform any necessary setup tasks.\n we declare the the setup function using the syntax `void setup()`, followed by a pair of curley braces `{ ... }`. **Any code you wish to be run once upon startup should be placed within these curley braces.**.'},

                  { id: 'mc-prog-anat-5b', type: 'codetooltip', content: 'void setup() {\n  Serial.begin(9600);\n  pinMode(GREEN_LED_PIN, OUTPUT);\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'void setup() {', blocks: [{ id: 'mc-cat-3-3-anat-tip-4', type: 'markdown', content: 'This line declares the setup function, which is a special function that runs once when the microcontroller is powered on or reset.'}]},
                    ]
                  }},

                  { id: 'mc-prog-anat-6', type: 'markdown', content: '## Loop Function\n\nThis is another special function that runs repeatedly after the setup function has completed. It contains the main logic of the program and is where you would typically read sensor data, make decisions, and control actuators. Similar to the `setup()` function, we declare the loop function using the syntax `void loop()`, followed by a pair of curley braces `{ ... }`. **Any code you wish to be run repeatedly should be placed within these curley braces.**.'},

                  { id: 'mc-prog-anat-6b', type: 'codetooltip', content: 'void loop() {\n  digitalWrite(GREEN_LED_PIN, HIGH);\n  delay(1000);\n  digitalWrite(GREEN_LED_PIN, LOW);\n  delay(1000);\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'void loop() {', blocks: [{ id: 'mc-cat-3-3-anat-tip-5', type: 'markdown', content: 'This line declares the loop function, which is a special function that runs repeatedly after the setup function has completed.'}]},
                    ]
                  }},

                  { id: 'mc-prog-anat-7b', type: 'markdown', content: '## Full Program Example\n\nPutting it all together, here is an example of a complete microcontroller program that includes preprocessor directives, global variables, a setup function, and a loop function.'},

                  { id: 'mc-prog-anat-7', type: 'codetooltip', content: '// PREPROCESSING DIRECTIVES\n#include <Servo.h>\n#define GREENLEDPIN 13\n\n// GLOBAL VARIABLES:\nchar my_favorite_letter = \'m\';   // My favorite letter\nint my_yellow_led = 15;          // Define a pin for the yellow LED\n\n// SETUP FUNCTION\nvoid stup() {\n  Serial.begin(9600);\n  pinMode(GREENLEDPIN, OUTPUT);\n}\n\n// PRIMARY PROGRAM LOOP\nvoid loop() {\n  digitalWrite(GREENLEDPIN, HIGH);\n  delay(1000);\n  digitalWrite(GREENLEDPIN, LOW);\n  delay(1000);\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      {text: 'PREPROCESSING DIRECTIVES', blocks: [{ id: 'mc-cat-3-3-anat-tip-0', type: 'markdown', content: 'These lines of code are preprocessor directives, which are instructions that are processed before the actual compilation of the program begins. They are used to include libraries and define constants.'}]},
                      {text: 'GLOBAL VARIABLES', blocks: [{ id: 'mc-cat-3-3-anat-tip-1', type: 'markdown', content: 'These lines declare global variables that can be accessed from anywhere in the program.'}]},
                      {text: 'SETUP FUNCTION', blocks: [{ id: 'mc-cat-3-3-anat-tip-2', type: 'markdown', content: 'The setup function is a special function that runs once when the microcontroller is powered on or reset. It is used to initialize variables, set pin modes, and perform any necessary setup tasks.'}]},
                      {text: 'PRIMARY PROGRAM LOOP', blocks: [{ id: 'mc-cat-3-3-anat-tip-3', type: 'markdown', content: 'The loop function is another special function that runs repeatedly after the setup function has completed. It contains the main logic of the program and is where you would typically read sensor data, make decisions, and control actuators.'}]},
                    ]
                  }},
                ]
              },

              { id: 'mc-prog-variables',
                title: 'Variables and Data Types',
                description: 'Understanding variables, data types, and how to use them in microcontroller programming.',
                blocks: [
                  { id: 'mc-prog-var-0', type: 'markdown', content: '# 📦What is a Variable?\n\nA variable can be thought of as a "storage container" within the microcontroller that allows us to hold onto and manipulate data. Variables have three main components:\n\n1. **Data Type**: The type of data the variable will represent (e.g., `int`, `float`).\n2. **Name**: A unique identifier for the variable (e.g., `sensorValue`, `temperature`).\n3. **Value**: The actual data stored in the variable (e.g., `25`, `3.14`).' },

                  { id: 'mc-prog-var-0b', type: 'codetooltip', content: 'int the_answer_to_life = 42;', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'int', blocks: [{ id: 'mc-cat-3-3-var-tip-0', type: 'markdown', content: 'This is the data type of the variable, which in this case is an integer (a whole number).'}]},
                      { text: 'the_answer_to_life', blocks: [{ id: 'mc-cat-3-3-var-tip-1', type: 'markdown', content: 'This is the name of the variable, which is a unique identifier that we can use to refer to this variable in our code.'}]},
                      { text: '42;', blocks: [{ id: 'mc-cat-3-3-var-tip-2', type: 'markdown', content: 'This is the value assigned to the variable, which in this case is the integer 42.' }]}
                    ]
                  }},

                  { id: 'mc-prog-var-0c', type: 'markdown', content: 'In this example, we have declared a variable named `the_answer_to_life` of type `int` and assigned it the value `42`. This means that whenever we use the variable `the_answer_to_life` in our code, it will represent the integer value `42`.' },

                  { id: 'mc-prog-var-0c2', type: 'markdown', content:'### Initialization vs. Declaration\n\nIn programming, it\'s important to understand the difference between **initialization** and **declaration** of variables. Notice how in the above example, we: 1. State the variable type, 2. Give the variable a name,3. Assign the variable a value.\n\nThe code above is an example of both declaring and initializing a variable at the same time, which is a common practice in programming. However, it\'s also possible to declare a variable without initializing it, which means we create the variable and give it a name, but we do not assign it a value right away. This is shown in the code below:'},

                  { id: 'mc-prog-var-1', type: 'codetooltip', content: 'int the_answer_to_life;', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'int', blocks: [{ id: 'mc-cat-3-3-var-tip-0', type: 'markdown', content: 'This is the data type of the variable, which in this case is an integer (a whole number).'}]},
                      { text: 'the_answer_to_life', blocks: [{ id: 'mc-cat-3-3-var-tip-1', type: 'markdown', content: 'This is the name of the variable, which is a unique identifier that we can use to refer to this variable in our code.'}]},
                      { text: ';', blocks: [{ id: 'mc-cat-3-3-var-tip-2', type: 'markdown', content: 'Notice that we have not assigned any value to this variable. This means that the variable is currently uninitialized, and its value is undefined until we assign a value to it later in the code.' }]}
                    ]
                    }
                  },

                  { id: 'mc-prog-var-2b', type: 'note', content: '- **Declaring** a variable means that we create a "box" to store something in, we label that box with a name, but we *don\'t actually put anything inside the box*.\n- **Initializing** a variable means that we assign a value to it for the first time, which is what we have been doing in all examples prior to this one.' },

                  { id: 'mc-prog-var-0d', type: 'dropdown', content: 'Example: accessing a variable in code', children: [
                    { id: 'mc-prog-var-0d-1', type: 'markdown', content: 'Now that we have declared our variable, we can use it in our code to perform various operations. For example, we can print the value of the variable to the serial monitor:'},
                    { id: 'mc-prog-var-0d-2', type: 'codetooltip', content: 'int the_answer_to_life = 42;  // Initialize the variable at the top of our code\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(the_answer_to_life);  // This will print "42" to the serial monitor\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'Serial.println(the_answer_to_life);', blocks: [
                          { id: 'mc-cat-3-3-var-tip-3', type: 'markdown', content: 'When the computer encounters this code and sees the variable name, it will \"replace\" the variable name with its assigned value. So, in this case, it will replace `the_answer_to_life` with `42`, and the line of code will effectively become `Serial.println(42);`, which is what gets executed and prints \"42\" to the serial monitor.'}
                        ]}
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-var-0e', type: 'dropdown', content: 'Example: Changing the value of a variable', children: [
                    { id: 'mc-prog-var-0e-1', type: 'markdown', content: 'Variables are called \"variables\" because their value can vary (i.e., change) throughout the program. For example, we can change the value of our variable `the_answer_to_life` like this:'},
                    { id: 'mc-prog-var-0e-2', type: 'codetooltip', content: 'int the_answer_to_life = 42;  // Initialize the variable at the top of our code\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(the_answer_to_life);  // This will print "42" to the serial monitor\n\n  the_answer_to_life = 43;  // Change the value of the variable\n  Serial.println(the_answer_to_life);  // This will now print "43" to the serial monitor\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'the_answer_to_life = 42;', blocks: [
                          { id: 'mc-prog-var-3-3-var-tip-4', type: 'markdown', content: 'We **initialize** the variable `the_answer_to_life` with the value `42` at the beginning of our code.'}
                        ]},
                        { text: 'Serial.begin(9600);', blocks: [{id: 'mc-cat-3-3-var-tip-5', type: 'markdown', content: 'This is required for communication with the computer. See the [🔗UART / Serial Communication](http://localhost:3000/academy-backend/?course=microcontrollers&module=mc-prog-uart) section for more information'}]},
                        { text: 'Serial.println(the_answer_to_life);', blocks: [
                          { id: 'mc-cat-3-3-var-tip-6', type: 'markdown', content: 'This will print the current value of `the_answer_to_life` to the serial monitor, which is initially `42`.'}
                        ]},
                        { text: 'the_answer_to_life = 43;', blocks: [{id: 'mc-cat-3-3-var-tip-7', type: 'markdown', content: 'Here, we change the value of `the_answer_to_life` to `43`. This is an example of how variables can be updated throughout the program.'}]},
                        { text: 'Serial.println(the_answer_to_life);', blocks: [{ id: 'mc-cat-3-3-var-tip-8', type: 'markdown', content: 'Now, when we print `the_answer_to_life` again, it will reflect the updated value of `43` instead of the original value of `42`.' }]}
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-var-0f', type: 'dropdown', content: 'Example: Using variables in calculations', children: [
                    { id: 'mc-prog-var-0f-1', type: 'markdown', content: 'Variables can also be used in calculations and expressions. For example, we can perform arithmetic operations on variables:'},
                    { id: 'mc-prog-var-0f-2', type: 'codetooltip', content: 'int a = 5;\nint b = 10;\nint sum = a + b;\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(sum);  // This will print "15" to the serial monitor\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'int a = 5;', blocks: [{ id: 'mc-cat-3-3-var-tip-9', type: 'markdown', content: 'Here, we declare an integer variable, name it `a`, and assign it the value `5`.'}]},
                        { text: 'int b = 10;', blocks: [{ id: 'mc-cat-3-3-var-tip-10', type: 'markdown', content: 'Here, we declare another integer variable, name it `b`, and assign it the value `10`.'}]},
                        { text: 'int sum = a + b;', blocks: [{ id: 'mc-cat-3-3-var-tip-11', type: 'markdown', content: 'Here, we declare a third integer variable named `sum`, and assign it the value of `a + b`, which is the result of adding the values of `a` and `b` together. In this case, `sum` will be assigned the value `15` since `5 + 10 = 15`.'}]}
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-var-1', type: 'markdown', content: '# 🔟Data Types\n\nIn microcontroller programming, the processor can only understand \`1\`s and \`0\`s. As such, we have to manually tell the processor what **type** a variable is. Common data types include:\n\n- `int`: Used to store whole numbers (e.g., 1, -5, 100).\n- `float`: Used to store decimal numbers (e.g., 3.14, -0.001).\n- `boolean`: Used to store true/false values. (Note, we can also write \`HIGH\` or \`LOW\`, or \`1\` and \`0\`, which mean the same thing here).\n- `char`: Used to store single characters (e.g., \'A\', \'b\').\n\nWhen declaring a variable, you must specify its data type and name. For example:' },

                  { id: 'mc-prog-var-2', type: 'codetooltip', content: 'int sensorValue = 42;\nfloat temperature = 20.15;\nbool isActive = true; // (Could also be HIGH or 1)\nchar grade = \'A\';\nbyte myBinary = 0b00100111', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'sensorValue', blocks: [{ id: 'mc-cat-3-3-var-tip-1', type: 'markdown', content: 'This is an integer variable that can store whole numbers. Examples include `1`, `-5`, `100`, etc.' }]},
                      { text: '42;', blocks: [{ id: 'mc-cat-3-3-var-tip-2', type: 'markdown', content: 'This is the value assigned to the variable `sensorValue` - a whole number!.' }]},
                      { text: 'temperature', blocks: [{ id: 'mc-cat-3-3-var-tip-2', type: 'markdown', content: 'This is a float variable that can store decimal numbers. Examples include `3.14`, `-0.001`, etc.' }]},
                      { text: '20.15;', blocks: [{ id: 'mc-cat-3-3-var-tip-2', type: 'markdown', content: 'This is the value assigned to the variable `temperature` - a decimal number! The decimal dot is important!.' }]},
                      { text: 'isActive', blocks: [{ id: 'mc-cat-3-3-var-tip-3', type: 'markdown', content: 'This is a boolean variable that can store true/false values.' }]},
                      { text: 'true', blocks: [{ id: 'mc-cat-3-3-var-tip-3', type: 'markdown', content: '`true`, `HIGH`, and `1` all represent a true value here, and work interchangably! For false, we can use `false`, `LOW`, or `0`' }]},
                      { text: 'grade', blocks: [{ id: 'mc-cat-3-3-var-tip-4', type: 'markdown', content: 'This is a char variable that can store single characters. Examples include `A`, `q`, `{`, etc.' }]},
                      { text: '\'A\';', blocks: [{ id: 'mc-cat-3-3-var-tip-4', type: 'markdown', content: 'Importantly, we surround the \'A\' with single quotes to indicate that it is a character literal.' }]},
                      { text: 'myBinary', blocks: [{ id: 'mc-cat-3-3-var-tip-5', type: 'markdown', content: 'This is a byte variable that can store 8 bits of binary data.' }]},
                      { text: '0b00100111', blocks: [{ id: 'mc-cat-3-3-var-tip-5', type: 'markdown', content: 'This is a binary literal that represents the byte value `39` in decimal. The `0b` prefix indicates that this is a binary number.' }]}
                    ]
                  }},

                  { id: 'mc-prog-var-2b', type: 'markdown', content: 'Another way to think about the concept of "types" is to remember that from the perspective of the microcontroller, all data is just a series of `1`s and `0`s. The **data type** is essentially instructions for how the microcontroller should interpret those `1`s and `0`s, as shown by the following diagram:' },

                  { id: 'mc-prog-var-2c', type: 'image', content: 'mc_vars_datatypes_1.png', metadata: { alt: 'Diagram illustrating how the same binary data can be interpreted differently based on its data type' }},

                  { id: 'mc-prog-var-8', type: 'markdown', content: '# 🔁Casting (converting types)\n\n**Casting** variables refers to converting a specific variable type into another. For example, we might cast an `int` to a `float` to perform a division that results in a decimal value.\n\nCasting is done by adding parenthesis in front of the value to be cast, specifying the desired type. For example...'},

                  { id: 'mc-prog-var-8b', type: 'codetooltip', content: 'int a = 5;\nint b = 2;\nfloat result = (float)a / (float)b;\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(result);  // This will print "2.5" to the serial monitor\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'int a = 5;', blocks: [{ id: 'mc-cat-3-3-var-tip-9', type: 'markdown', content: 'Here, we declare an integer variable named `a` and assign it the value `5`.'}, { id: 'mc-cat-3-3-var-tip-10', type: 'note', content: 'Since `a` is an integer, it can only hold whole numbers.' }]},
                      { text: 'int b = 2;', blocks: [{ id: 'mc-cat-3-3-var-tip-11', type: 'markdown', content: 'Here, we declare another integer variable named `b` and assign it the value `2`.'}, { id: 'mc-cat-3-3-var-tip-12', type: 'note', content: 'Since `b` is also an integer, it can only hold whole numbers.' }]},
                      { text: 'float result', blocks: [{ id: 'mc-cat-3-3-var-tip-13', type: 'markdown', content: 'Here, we declare a float variable named `result`, which can hold decimal numbers.'}]},
                      { text: '(float)a', blocks: [{ id: 'mc-cat-3-3-var-tip-14', type: 'markdown', content: 'This is an example of casting the integer variable `a` to a float. This allows us to perform a division that results in a decimal value instead of an integer division that would truncate the decimal part.' }]},
                      { text: '(float)b', blocks: [{ id: 'mc-cat-3-3-var-tip-15', type: 'markdown', content: 'This is an example of casting the integer variable `b` to a float for the same reason as `a`.' }]},
                      { text: 'Serial.println(result);', blocks: [{ id: 'mc-cat-3-3-var-tip-16', type: 'markdown', content: 'Since we cast both `a` and `b` to floats before performing the division, the result is a float value of `2.5` instead of an integer value of `2`.' }]},
                    ]
                  }},

                  { id: 'mc-prog-var-3', type: 'markdown', content: '# 👁️Scope\n\nVariables can be declared in different parts of your code, and their location determines their **scope** (i.e., where they can be accessed from). There are two \'types\' of scopes a variable can be accessed in:' },

                  { id: 'mc-prog-var-3b', type: 'note', content: '- **Global Variables**: Declared outside of any function, usually at the top of the program. They can be accessed from any part of the program.\n- **Local Variables**: Declared inside a function. They can only be accessed within that function.' },

                  { id: 'mc-prog-var-4', type: 'codetooltip', content: 'int globalVar = 10;\n\nvoid setup() {\n  int localVar = 5;\n}\n\nvoid loop() {\n  // globalVar can be accessed here (it exists everywhere in the program)\n  Serial.println(globalVar);  // This will work!\n\n  // localVar cannot be accessed here (it does not exist in the eyes of the void loop() {} function)\n  Serial.println(localVar);  // This will throw an error!\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'globalVar', blocks: [{ id: 'mc-cat-3-3-var-tip-5', type: 'markdown', content: 'This is a global variable that can be accessed from anywhere in the program.' }]},
                      { text: 'localVar', blocks: [{ id: 'mc-cat-3-3-var-tip-6', type: 'markdown', content: 'This is a local variable that can only be accessed within the setup() function. It *does not exist* from the perspective of the loop.\n\nIn other words, it\'s **local** to the `setup` function.' }]},
                      { text: 'Serial.println(globalVar);', blocks: [{ id: 'mc-cat-3-3-var-tip-7', type: 'markdown', content: 'This will work because `globalVar` is a global variable that can be accessed from anywhere in the program.' }]},
                      { text: 'Serial.println(localVar);', blocks: [{ id: 'mc-cat-3-3-var-tip-8', type: 'markdown', content: 'This will throw an error because `localVar` is a local variable that cannot be accessed from the `loop` function. Since it was declared **inside the `setup()` function, it is not visible outside of it.' }]}
                    ]
                  }},

                  { id: 'mc-prog-var-5', type: 'markdown', content: '# 📑The ASCII Table\n\nTo avoid confusion between different systems, a standardized method of representing characters as numbers was created. This is known as the **ASCII (American Standard Code for Information Interchange) Table**.\n\nThe ASCII Table is centered specifically around what specific \`binary numbers\` should represent - of note, which \`characters\` are represented by which combinations of \`1\`s and \`0\`s.' },

                  { id: 'mc-prog-var-5b', type: 'dropdown', content: 'Full ASCII Table', children: [
                    { id: 'mc-prog-var-6', type: 'webimage', content: 'https://web.alfredstate.edu/faculty/weimandn/miscellaneous/ascii/ASCII%20Conversion%20Chart.gif' },
                  ] },
                  

                  { id: 'mc-prog-var-7', type: 'markdown', content: 'To illustrate this example, let\'s say that we have some arbitrary \`binary number\`, such as \`01001101\`. From the perspective of the microcontroller, this is just a series of transistors that are flipped on and off. However, we can tell the microcontroller **how to interpret this number** by storing in in an appropriate variable:'},

                  { id: 'mc-prog-var-7b', type: 'codetooltip', content: 'byte myByte = 0b01001101;  // The microcontroller interprets this as literally the 1s and 0s', metadata: {
                    language: 'cpp',
                  }},

                  { id: 'mc-prog-var-7c', type: 'markdown', content: 'However, by setting a *different variable type* to the same value, the microcontroller interprets it differently, according to the ASCII Table:'},

                  { id: 'mc-prog-var-7d', type: 'codetooltip', content: 'char myChar = 0b01001101;  // The microcontroller interprets this as the character "M" according to the ASCII Table', metadata: {language: 'cpp'}},

                  { id: 'mc-prog-var-7e', type: 'codetooltip', content: 'int myInt = 0b01001101;  // The microcontroller interprets this as the integer 77', metadata: {language: 'cpp'}},

                  { id: 'mc-prog-var-7f', type: 'markdown', content: 'Understanding how binary values are interpreted is extremely important for when we begin the unit on [🔗Serial / UART communication](https://schomath.github.io/academy-backend/?course=microcontrollers&module=mc-prog-uart), as our program must be able to accurately interpret a series of `1s` and `0s` that arrive from other devices.'},

                  
                ]
              },
              
              { id: "mc-prog-digio",
                title: "Digital Reading and Writing",
                description: "Learn how to read from and write to digital pins on a microcontroller.",
                blocks: [
                  { id: 'mc-prog-digio-1', type: 'markdown', content: '# Digital Input \& Output\n\nRecall that **digital** refers to field devices that can only have two states: `on` or `off`. The Arduino programming language can represent a digital state in a number of ways: \n- \`HIGH\` and \`LOW\` \n- \`1\` and \`0\` \n- \`true\` and \`false\` \n\nAll of these mean the same thing, but are simply represented differently in different contexts. For example: we could choose to represent a digital value as either an \`boolean\` or a \`integer\`:' },

                  { id: 'mc-prog-digio-2', type: 'codetooltip', content: 'bool buttonState = HIGH;', metadata: { 
                    language: 'cpp',
                    parts: [
                      { text: 'bool', blocks: [{ id: 'mc-cat-3-3-digio-tip-1', type: 'markdown', content: 'A \`boolean\` is the simplest representation of a digital value.' }]},
                      { text: 'buttonState', blocks: [{ id: 'mc-cat-3-3-digio-tip-2', type: 'markdown', content: 'The variable name can be anything you choose, but it should be descriptive of the value it holds.' }]},
                      { text: 'HIGH', blocks: [{ id: 'mc-cat-3-3-digio-tip-3', type: 'markdown', content: '\`HIGH\` is a predefined constant in the Arduino programming language that represents a digital value of 1 or true. \n\nWe could also set this to \`true\` or \`1\` for the same effect!' }]},
                    ]
                  }},

                  { id: 'mc-prog-digio-3', type: 'codetooltip', content: 'int buttonState = 1;', metadata: { 
                    language: 'cpp',
                    parts: [
                      { text: 'int', blocks: [{ id: 'mc-cat-3-3-digio-tip-1', type: 'markdown', content: 'An \`int\` can hold values other than 1 and 0, offering more flexibility but can be ambiguous in the context of digital values.' }]},
                      { text: 'buttonState', blocks: [{ id: 'mc-cat-3-3-digio-tip-2', type: 'markdown', content: 'The variable name can be anything you choose, but it should be descriptive of the value it holds.' }]},
                      { text: '1', blocks: [{ id: 'mc-cat-3-3-digio-tip-3', type: 'markdown', content: '\`1\` represents a digital value of HIGH or true. \n\nWe could also set this to \`true\` or \`HIGH\` for the same effect! Again, however, we could accidentally set this to a value above 1, which might lead to unexpected behavior.' }]},
                    ]
                  }},

                  { id: 'mc-prog-digio-4', type: 'markdown', content: '# Digital Inputs\n\nTo read a digital input (*such as a button*), we utilize the function \`digitalRead(pin)\`, where `pin` is the number of the digital pin you want to read from. This function **returns** a value of `HIGH` or `LOW`, depending on the state of the input.' },
                  { id: 'mc-prog-digio-2-func', type: 'codetooltip', content: 'sensor_value_read = digitalRead(pin);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'sensor_value_read', blocks: [{ id: 'mc-cat-3-3-digio-tip-4', type: 'markdown', content: 'This variable will store the value returned by the \`digitalRead()\` function. It\'s value depends on it\'s data type (for example, if \`sensor_value_read\` is an \`int\`, it returns \`1\` or \`0\`, but if it is a \`boolean\`, it returns \`true\` or \`false\`.' }]},
                      { text: 'digitalRead', blocks: [{ id: 'mc-cat-3-3-digio-tip-5', type: 'markdown', content: '\`digitalRead()\` is a built-in function in the Arduino programming language that reads the value from a specified digital pin. It takes **one argument**: the pin number to read from. It returns either `HIGH` or `LOW`, depending on the state of the input.' }]},
                      { text: 'pin', blocks: [
                        { id: 'mc-cat-3-3-digio-tip-6', type: 'markdown', content: 'This is the GPIO pin our input device is connected to.' }, 
                        { id: 'mc-cat-3-3-digio-tip-7', type: 'note', content: 'Instead of putting the number here, you can use a variable defined at the top of your script so you only have to change the number in one single place.' }
                      ]},
                    ]
                  }},

                  { id: 'mc-prog-digio-5', type: 'dropdown', content: 'Example of Digital Reading Code', children: [
                    { id: 'mc-programming-digitalio-2-code', type: 'codetooltip', content: 'const int buttonPin = 2;\nint buttonState = LOW;\n\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP);\n}\n\nvoid loop() {\n  buttonState = digitalRead(buttonPin);\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        {
                          text: 'const int buttonPin = 2;',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-1', type: 'markdown', content: '**Define your input pin.**\n\n`buttonPin` stores which digital pin the button is wired to.' }
                          ]
                        },
                        {
                          text: 'int buttonState = LOW;',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-2', type: 'markdown', content: '**A variable to store the result in.**\n\n`buttonState` will be updated with the value read from the button pin, and can be used later in the code to make decisions based on whether the button is pressed or not.' }
                          ]
                        },
                        {
                          text: 'pinMode',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-3', type: 'markdown', content: '**Tells the microcontroller if the pin will be an \`input\` or an \`output\`.**\n\n`pinMode(buttonPin, INPUT_PULLUP)` configures the specified pin to behave as an input with an internal pull-up resistor. This means that when the button is not pressed, the pin will read `HIGH`, and when the button is pressed, it will connect to ground and read `LOW`.'}
                          ]
                        },
                        {
                          text: 'buttonPin,',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-4', type: 'markdown', content: '**The pin number to read from.**\n\nThis should match the pin number you defined at the top of your script.' }
                          ]
                        },
                        {
                          text: 'INPUT_PULLUP', 
                          blocks: 
                          [
                            { id: 'mc-cat-3-3-read-tip-5', type: 'markdown', content: '**Configures the pin as an input with an internal pull-up resistor.**\n\nThis means that when the button is not pressed, the pin will read `HIGH`, and when the button is pressed, it will connect to ground and read `LOW`. We can also configure this pin as a \`INPUT\`, which would require an external pull-down resistor, and the logic would be reversed: the pin would read `LOW` when the button is not pressed, and `HIGH` when it is pressed.' }
                          ]
                        },

                        {
                          text: 'buttonState',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-6', type: 'markdown', content: '**Stores the value read from the button pin.**\n\nThis variable is updated with the value returned by `digitalRead(buttonPin)`, and can be used later in the code to make decisions based on whether the button is pressed or not.' }
                          ]
                        },

                        { text: 'digitalRead(buttonPin);',
                          blocks: [
                            { id: 'mc-cat-3-3-read-tip-7', type: 'markdown', content: '**Reads the value from the button pin.**\n\n`digitalRead(buttonPin)` reads the current state of the specified digital pin and returns `HIGH` or `LOW` depending on whether the button is pressed or not.' }
                          ]
                        }
                      ]
                    } },
                  ]},
                  
                  { id: 'mc-prog-digio-6', type: 'markdown', content: '## Digital Writing\n\nTo write a digital output, you use a function like `digitalWrite(pin, value)`, where `pin` is the number of the digital pin you want to write to, and `value` is either `HIGH` or `LOW`. This allows you to control devices such as LEDs, relays, or motors by setting the output pin to the desired state.' },

                  { id: 'mc-prog-digio-6-func', type: 'codetooltip', content: 'digitalWrite(pin, value);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'digitalWrite', blocks: [{ id: 'mc-cat-3-3-digio-tip-8', type: 'markdown', content: '\`digitalWrite()\` is a built-in function in the Arduino programming language that sets a digital pin to either `HIGH` or `LOW`. It takes **two arguments**: the pin number to write to, and the value to set it to.' }]},
                      { text: 'pin', blocks: [
                        { id: 'mc-cat-3-3-digio-tip-9', type: 'markdown', content: 'This is the GPIO pin our output device is connected to.' }, 
                        { id: 'mc-cat-3-3-digio-tip-10', type: 'note', content: 'Instead of putting the number here, you can use a variable defined at the top of your script so you only have to change the number in one single place.' }]
                      },
                      { text: 'value', blocks: [
                        { id: 'mc-cat-3-3-digio-tip-11', type: 'markdown', content: 'This is the value you want to set the pin to. It can be either `HIGH` or `LOW`, depending on whether you want to turn the device on or off.' },
                        { id: 'mc-cat-3-3-digio-tip-12', type: 'note', content: 'You can also use a variable here, which can be useful for toggling the state of a pin or setting it based on some condition in your code.' }
                      ]}
                    ]
                  }},

                  { id: 'mc-prog-digio-7', type: 'dropdown', content: 'Example of Digital Writing Code', children: [
                    { 
                      id: 'mc-programming-digitalio-3-code', 
                      type: 'codetooltip', 
                      content: 'const int ledPin = 13;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}', 
                      metadata: {
                        language: 'cpp',
                        parts: [
                          { text: 'const int ledPin = 13;',
                            blocks: [
                              { id: 'mc-cat-3-3-write-tip-1', type: 'markdown', content: '**Define your output pin.**\n\n`ledPin` stores which digital pin the LED is wired to.' }
                            ]
                          },
                          { text: 'pinMode(ledPin, OUTPUT);',
                            blocks: [
                              { id: 'mc-cat-3-3-write-tip-2', type: 'markdown', content: '**Tells the microcontroller this pin will be an output.**\n\n`pinMode(ledPin, OUTPUT)` configures the specified pin to behave as an output, allowing you to control devices connected to that pin.' }
                            ]
                          },
                          { text: 'digitalWrite(ledPin, HIGH);',
                            blocks: [
                              { id: 'mc-cat-3-3-write-tip-3', type: 'markdown', content: '**Sets the LED pin to HIGH, turning the LED on.**\n\n`digitalWrite(ledPin, HIGH)` sets the specified pin to a high voltage level, which typically turns on the connected device (in this case, an LED).' },
                              { id: 'mc-cat-3-3-write-tip-4', type: 'note', content: 'HIGH will output a signal of 3.3V or 5V, depending on your microcontroller. Make sure this voltage is compatible with your output device!' }
                            ]
                          },
                          { text: 'delay(1000);',
                            blocks: [
                              { id: 'mc-cat-3-3-write-tip-5', type: 'markdown', content: '**Pauses the program for a specified amount of time.**\n\n`delay(1000)` pauses the execution of the program for 1000 milliseconds (or 1 second) before moving on to the next line of code.' }
                            ]
                          },
                          { text: 'digitalWrite(ledPin, LOW);',
                            blocks: [
                              { id: 'mc-cat-3-3-write-tip-6', type: 'markdown', content: '**Sets the LED pin to LOW, turning the LED off.**\n\n`digitalWrite(ledPin, LOW)` sets the specified pin to a low voltage level (0V), which typically turns off the connected device (in this case, an LED).' },
                              { id: 'mc-cat-3-3-write-tip-7', type: 'note', content: 'LOW will output a signal of 0V, effectively turning off the device connected to that pin.' }
                            ]
                          }
                        ]
                      }
                    }
                  ]}
                ]
              },

              { id: "mc-prog-cond",
                title: "Conditional Logic",
                description: "Conditionals with if, else if, and else statements.",
                blocks: [
                  { id: 'mc-prog-cond-1', type: 'markdown', content: '# Simple if statement\n\nConditional statements allow you to execute different blocks of code based on certain conditions. The most common conditional statements in C/C++ are `if`, `else if`, and `else`.\nWe define an if statement using the keyword `if`, followed by the **conditions in parentheses**, and the code to execute in curly braces `{}`. We can use the following **operators** to compare values:\n- `==` means equal to\n- `!=` means not equal to\n- `<` means less than\n- `>` means greater than\n- `<=` means less than or equal to\n- `>=` means greater than or equal to' },

                  { id: 'mc-prog-cond-2', type: 'codetooltip', content: 'if (buttonState == HIGH) {\n  // Code to execute if the button is pressed\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'if', blocks: [{ id: 'mc-cat-3-4-cond-tip-1', type: 'markdown', content: '**Starts a conditional statement.**\n\nThe code inside the curly braces will only execute if the condition in the parentheses is true.' }]},
                      { text: 'buttonState', blocks: [{ id: 'mc-cat-3-4-cond-tip-2', type: 'markdown', content: 'This is the variable we are checking the value of.' }]},
                      { text: '==', blocks: [{ id: 'mc-cat-3-4-cond-tip-3', type: 'markdown', content: 'The equality operator checks if `buttonState` is equal to ...' }]},
                      { text: 'HIGH', blocks: [{ id: 'mc-cat-3-4-cond-tip-4', type: 'markdown', content: '... `HIGH`. If `buttonState` is `HIGH`, the condition is true and the code inside the curly braces will execute.' }, { id: 'mc-cat-3-4-cond-tip-5', type: 'note', content: 'Remember that `HIGH` can also be represented as `1` or `true`, depending on how you defined your variables!' }]},
                    ]
                  }},

                  { id: 'mc-prog-cond-1-5', type: 'note', content: 'When the microcontroller encounters an expression as part of a conditional statement, it **evaluates the expression** to determine whether it is true or false. So, say you type \`if (4 == 4) {...}\`, then the condition evalues and turns into \`if (true) {...}\`, which runs!\n\nYou can also store the result of a comparison in a variable - as an example: \`bool is_4_more_than_5 = (4 > 5);\`. This would evaluate to **false**, meaning the variable \`is_4_more_than_5\` would equal \`false\` or \`LOW\`.' },

                  { id: 'mc-prog-cond-3', type: 'markdown', content: '# if-else statement\n\nAn `if-else` statement allows you to execute one block of code if a condition is true, and a different block of code if the condition is false. The structure looks like this:' },
                  { id: 'mc-prog-cond-4', type: 'codetooltip', content: 'if (buttonState == HIGH) \n{\n  // Code to execute if the button is pressed\n} \nelse \n{\n  // Code to execute if the button is not pressed\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'else', blocks: [{ id: 'mc-cat-3-4-cond-tip-7', type: 'markdown', content: '**Defines the block of code to execute if the condition is false.**\n\nIf the condition in the `if` statement is not met (i.e., if `buttonState` is not `HIGH`), then the code inside the `else` block will execute instead.' }]}
                    ]
                  }},

                  { id: 'mc-prog-cond-5', type: 'markdown', content: '# else-if statement\n\nAn `else-if` statement allows you to check multiple conditions in sequence. If the first condition is false, it checks the next condition, and so on. The structure looks like this:' },
                  { id: 'mc-prog-cond-6', type: 'codetooltip', content: 'if (buttonState == HIGH) \n{\n  // Code to execute if the button is pressed\n} \nelse if (buttonState == LOW) \n{\n  // Code to execute if the button is not pressed\n} \nelse \n{\n  // Code to execute if buttonState is neither HIGH nor LOW\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'if (buttonState == HIGH)', blocks: [{ id: 'mc-cat-3-4-cond-tip-8', type: 'markdown', content: '**First condition to check.**\n\nIf `buttonState` is `HIGH`, the code in this block will execute. If not, we move to the next condition.' }]},
                      { text: 'else if (buttonState == LOW)', blocks: [{ id: 'mc-cat-3-4-cond-tip-9', type: 'markdown', content: '**Second condition to check.**\n\nIf the first condition is false, we check if `buttonState` is `LOW`. If it is, the code in this block will execute.' }]},
                      { text: 'else', blocks: [{ id: 'mc-cat-3-4-cond-tip-10', type: 'markdown', content: '**Defines the block of code to execute if all previous conditions are false.**\n\nIf `buttonState` is neither `HIGH` nor `LOW`, then the code inside this `else` block will execute.' }]}
                    ]
                  }},

                  { id: 'mc-prog-cond-7', type: 'markdown', content: 'You can have as many `else-if` statements as you need to check for different conditions. Just remember that the program will check each condition in order, and will execute the block of code for the first condition that is true.' },

                  { id: 'mc-prog-cond-8', type: 'markdown', content: '# Examples'},

                  { id: 'mc-prog-cond-8a', type: 'dropdown', content: 'Example: else-if statement', children: [
                    { id: 'mc-programming-conditional-1-code', type: 'codetooltip', content: 'int sensor_temp;\nint sensor_temp_pin;\n\nvoid setup(){\n  pinMode(sensor_temp_pin, INPUT);\n}\n\nvoid loop(){\n  sensor_temp = analogRead(sensor_temp_pin);\n\n  if (sensor_temp > 30) {\n    Serial.println("WARNING! Sensor temp too high!");\n  } \n  else if (sensor_temp > 20) {\n    Serial.println("Caution! Sensor Temp is moderate.");\n  } \n  else {\n    Serial.println("Sensor Temp Normal");\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'if (sensor_temp > 30)', blocks: [{ id: 'mc-cat-3-4-cond-tip-11', type: 'markdown', content: '**Checks if the sensor temperature is above 30.**\n\nIf this condition is true, it indicates that the sensor temperature is too high, and a warning message will be printed to the Serial Monitor.' }, { id: 'mc-cat-3-4-cond-tip-12', type: 'note', content: 'In the case that this is true, none of the other conditionals will run, even if they are also true!' }]},
                        { text: 'else if (sensor_temp > 20)', blocks: [{ id: 'mc-cat-3-4-cond-tip-13', type: 'markdown', content: '**Checks if the sensor temperature is above 20.**\n\nThis condition is only checked if the previous condition (`sensor_temp > 30`) is false. If this condition is true, it indicates that the sensor temperature is moderate, and a caution message will be printed to the Serial Monitor.' }, { id: 'mc-cat-3-4-cond-tip-14', type: 'note', content: 'In the case that this is true, the final else statement will not run, even if it is also true!' }]},
                        { text: 'else', blocks: [{ id: 'mc-cat-3-4-cond-tip-15', type: 'markdown', content: '**Executes if all previous conditions are false.**\n\nIf the sensor temperature is not above 30 and not above 20, then it is considered normal, and a message indicating that the sensor temperature is normal will be printed to the Serial Monitor.' }]}
                      ]
                    }}
                  ]}
                ]
              },

              { id: "mc-prog-loops",
                title: "Loops",
                description: "Using for and while loops to repeat code blocks.",
                blocks: [
                  
                  { id: 'mc-prog-loops-1', type: 'markdown', content: '# For Loops\n\nA `for` loop is a control structure that allows you to repeat a block of code a specific number of times. It consists of three parts: the initialization, the condition, and the increment/decrement. The structure looks like this:' },


                  { id: 'mc-prog-loops-2', type: 'codetooltip', content: 'for (int i = 0; i < 10; i++) \n{\n  // Code to repeat\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      {text: 'int i = 0;', blocks: [{ id: 'mc-cat-3-4-loops-tip-1', type: 'markdown', content: '**Initialization**\n\nThis is where you define and initialize your loop variable. In this case, we\'re creating an integer variable `i` and setting it to 0. This variable can be called anything, so long as it follows the naming rules of C++ and does not overlap with other variable names in the same scope.' }]},
                      {text: 'i < 10;', blocks: [{ id: 'mc-cat-3-4-loops-tip-2', type: 'markdown', content: '**Condition**\n\nThis is the condition that is checked before each iteration of the loop. If the condition is true, the code inside the loop will execute. If it is false, the loop will terminate and the program will continue with the next line of code *after the loop*.' }]},
                      {text: 'i++', blocks: [{ id: 'mc-cat-3-4-loops-tip-3', type: 'markdown', content: '**Increment**\n\nThis is where you update your loop variable.\nIn this case, `i++` is shorthand for `i = i + 1`, which means that after each iteration of the loop, `i` will increase by 1.' }]},
                      {text: 'Code to repeat', blocks: [{ id: 'mc-cat-3-4-loops-tip-4', type: 'note', content: 'You can actually read or write to the initialized variable i inside the loop, just be careful you don\'t create an infinate loop!' }]},
                    ]
                  }},

                  { id: 'mc-prog-loops-3', type: 'markdown', content: '## For loop examples...' },
                  { id: 'mc-prog-loops-4', type: 'dropdown', content: 'Example 1 of for loop: simple repeating print', children: [
                    {
                      id: 'mc-programming-loops-1-code',
                      type: 'codetooltip',
                      content: 'const int maxIterations = 10;\nconst unsigned long pauseMs = 3000;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  for (int i = 1; i <= maxIterations; i++) {\n    Serial.print("Loop iteration: ");\n    Serial.println(i);\n  }\n\n  Serial.println("Waiting before repeating...");\n  delay(pauseMs);\n}',
                      metadata: {
                        language: 'cpp',
                        parts: [
                          {
                            text: 'const int maxIterations = 10;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-1', type: 'markdown', content: '**Maximum count value.**\n\nThis creates a constant integer named `maxIterations` and sets it to `10`, so the loop runs exactly ten times each cycle.' }
                            ]
                          },
                          {
                            text: 'const unsigned long pauseMs = 3000;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-2', type: 'markdown', content: '**Pause duration in milliseconds.**\n\n`3000` means a 3-second wait between batches of printed loop iterations.' }
                            ]
                          },
                          {
                            text: 'void setup() {',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-3', type: 'markdown', content: '**Arduino setup function.**\n\n`setup()` runs once when the board powers on or resets. It is used for one-time initialization.' }
                            ]
                          },
                          {
                            text: 'Serial.begin(9600);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-4', type: 'markdown', content: '**Start serial communication.**\n\nThis opens the serial connection at `9600` baud so messages can be printed to the Serial Monitor.' }
                            ]
                          },
                          {
                            text: 'void loop() {',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-5', type: 'markdown', content: '**Main repeating function.**\n\n`loop()` runs forever after `setup()`, so everything inside it repeats continuously.' }
                            ]
                          },
                          {
                            text: 'for',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-6', type: 'markdown', content: 'The for keyword tells our microcontroller we\'re about to start a loop.' }
                            ]
                          },
                          {
                            text: 'int i = 1;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-7', type: 'markdown', content: '**Initialize loop variable.**\n\nThis creates an integer variable `i` and sets it to `1` at the start of the loop.' }
                            ]
                          },
                          {
                            text: 'i <= maxIterations;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-8', type: 'markdown', content: '**Loop continuation condition.**\n\nThe loop will keep running as long as `i` is less than or equal to `maxIterations` (10). Once `i` exceeds 10, the loop will stop and the program will move on to the next lines of code after the loop.' },
                              { id: 'mc-cat-3-4-loops-ex1-tip-9', type: 'note', content: 'While we could also just set this to 10 here, using `maxIterations` makes it easier to change the number of iterations in one place!' }
                            ]
                          },
                          {
                            text: 'i++',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-10', type: 'markdown', content: '**Increment loop variable.**\n\nAfter each iteration of the loop, `i++` increases the value of `i` by 1. This is what allows us to eventually meet the condition to exit the loop.' }
                            ]
                          },
                          {
                            text: 'Serial.print("Loop iteration: ");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-7', type: 'markdown', content: '**Print label text without a new line.**\n\nThis writes the message prefix so the next print appears on the same line.' }
                            ]
                          },
                          {
                            text: 'Serial.println(i);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-8', type: 'markdown', content: '**Print the current loop number and end the line.**\n\nIf `i` is 4, the monitor shows `Loop iteration: 4`.' }
                            ]
                          },
                          {
                            text: 'Serial.println("Waiting before repeating...");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-9', type: 'markdown', content: '**Status message after the ten prints.**\n\nThis indicates the loop batch is complete and a pause is about to happen.' }
                            ]
                          },
                          {
                            text: 'delay(pauseMs);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex1-tip-10', type: 'markdown', content: '**Pause before repeating.**\n\n`delay(pauseMs)` waits 3000 ms, then `loop()` starts again and prints the next set of 10 iterations.' }
                            ]
                          }
                        ]
                      }
                    },
                    { id: 'mc-programming-loops-2-code', type: 'markdown', content: 'This example will generate the following response in the console of the arduino: \n\n -> Loop iteration: 1 \n\n -> Loop iteration: 2 \n\n ... \n\n -> Loop iteration: 10 \n\n -> Waiting before repeating... \n\nThen it will repeat this pattern indefinitely, printing "Loop iteration: X" for X from 1 to 10, followed by the waiting message, and then starting over at 1 again.'}
                  ]},
                  { id: 'mc-prog-loops-5', type: 'dropdown', content: 'Example 2 of for loop: Nested for loops', children: [
                    { id: 'mc-programming-loops-3-intro', type: 'markdown', content: 'This example demonstrates a **nested for loop** pattern where the outer loop counts by `2` (2, 4, 6, 8, 10), and for each outer step, an inner loop runs twice. It prints both loop values to the Serial Monitor so you can see how nested loops generate repeated grouped output before pausing and repeating.' },
                    {
                      id: 'mc-programming-loops-3-code',
                      type: 'codetooltip',
                      content: 'const int maxOuter = 10;\nconst int stepSize = 2;\nconst int repeatsPerStep = 2;\nconst unsigned long pauseMs = 4000;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int totalCount = 0;\n\n  for (int outer = 2; outer <= maxOuter; outer += stepSize) \n  {\n    for (int inner = 1; inner <= repeatsPerStep; inner++) \n    {\n      totalCount++;\n      Serial.print("Print #");\n      Serial.print(totalCount);\n      Serial.print(" -> outer=");\n      Serial.print(outer);\n      Serial.print(", inner=");\n      Serial.println(inner);\n    }\n  }\n\n  Serial.println("Batch complete. Waiting before repeat...");\n  delay(pauseMs);\n}',
                      metadata: {
                        language: 'cpp',
                        parts: [
                          {
                            text: 'const int maxOuter = 10;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-1', type: 'markdown', content: '**Outer loop upper limit.**\n\nThe outer counter will stop once it reaches `10`.' }
                            ]
                          },
                          {
                            text: 'const int stepSize = 2;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-2', type: 'markdown', content: '**Count by twos.**\n\nInstead of increasing by 1, the outer loop increases by `2` each time (`2, 4, 6, 8, 10`).' }
                            ]
                          },
                          {
                            text: 'const int repeatsPerStep = 2;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-3', type: 'markdown', content: '**Inner loop repeat count.**\n\nFor each outer value, the inner loop runs 2 times.' }
                            ]
                          },
                          {
                            text: 'const unsigned long pauseMs = 4000;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-4', type: 'markdown', content: '**Pause duration.**\n\n`4000` milliseconds means the program waits 4 seconds before repeating.' }
                            ]
                          },
                          {
                            text: 'Serial.begin(9600);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-5', type: 'markdown', content: '**Enable Serial Monitor output.**\n\nWithout this line, `Serial.print` and `Serial.println` will not display correctly.' }
                            ]
                          },
                          {
                            text: 'int totalCount = 0;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-6', type: 'markdown', content: '**Track total printed lines.**\n\nThis counter increments every time the nested loop prints one row.' }
                            ]
                          },
                          {
                            text: 'for',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-7', type: 'markdown', content: '**Start of outer loop.**\n\nThis loop will run for `outer` values of `2, 4, 6, 8, 10`.' }
                            ]
                          },
                          {
                            text: 'int outer = 2;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-7', type: 'markdown', content: 'The new variable \`outer\` will keep track of the counts of our outer loop. We will initialize this one at \`2\`.' }
                            ]
                          },
                          {
                            text: 'outer <= maxOuter;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-7', type: 'markdown', content: '**Outer loop condition.**\n\nThe outer loop will continue as long as `outer` is less than or equal to `maxOuter` (10).' }
                            ]
                          },
                          {
                            text: 'outer += stepSize',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-7', type: 'markdown', content: '**Outer loop increment.**\n\nAfter each iteration of the outer loop, `outer` increases by `stepSize` (2), creating the sequence `2, 4, 6, 8, 10`.' }
                            ]
                          },
                          {
                            text: 'for',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-7', type: 'markdown', content: '**Start of inner loop.**\n\nThis loop will run once for each value of `outer`, creating a nested structure.' }
                            ]
                          },
                          {
                            text: 'int inner = 1;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-8', type: 'markdown', content: '**Initialize inner loop counter.**\n\nThis variable keeps track of the current iteration of the inner loop.' },
                              { id: 'mc-cat-3-4-loops-ex2-tip-9', type: 'note', content: 'Remember, this value will RESET to 1 every time our outer loop runs. In this example, it will count from 1 to 2 for a single iteration of the outer loop, then switch back to 1 on the next itertion of the outer loop.' }
                            ]
                          },
                          {
                            text: 'inner <= repeatsPerStep;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-8', type: 'markdown', content: '**Inner loop condition.**\n\nThe inner loop will continue as long as `inner` is less than or equal to `repeatsPerStep` (2).' }
                            ]
                          },
                          {
                            text: 'inner++',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-8', type: 'markdown', content: '**Inner loop increment.**\n\nAfter each iteration of the inner loop, `inner` increases by 1, counting from 1 to 2 for each value of `outer`.' }
                            ]
                          },
                          {
                            text: 'totalCount++;',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-9', type: 'markdown', content: '**Increase print number.**\n\nThis creates an easy-to-read running count of how many lines have been printed so far.' }
                            ]
                          },
                          {
                            text: 'Serial.print("Print #");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-10', type: 'markdown', content: '**Print the line label.**\n\nUses `print` (no newline) so the next values appear on the same line.' }
                            ]
                          },
                          {
                            text: 'Serial.print(totalCount);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-11', type: 'markdown', content: '**Print current line number.**\n\nShows `1` through `10` across one full batch.' }
                            ]
                          },
                          {
                            text: 'Serial.print(" -> outer=");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-12', type: 'markdown', content: '**Add outer-loop label text.**\n\nThis makes it obvious which outer-loop step produced the current line.' }
                            ]
                          },
                          {
                            text: 'Serial.print(outer);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-13', type: 'markdown', content: '**Print outer-loop value.**\n\nDisplays one of the step-by-2 values (`2, 4, 6, 8, 10`).' }
                            ]
                          },
                          {
                            text: 'Serial.print(", inner=");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-14', type: 'markdown', content: '**Add inner-loop label text.**\n\nKeeps output readable by clearly separating `outer` and `inner` values.' }
                            ]
                          },
                          {
                            text: 'Serial.println(inner);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-15', type: 'markdown', content: '**Print inner-loop value and finish the line.**\n\n`println` ends the current row in the Serial Monitor.' }
                            ]
                          },
                          {
                            text: 'Serial.println("Batch complete. Waiting before repeat...");',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-16', type: 'markdown', content: '**Print completion message.**\n\nSignals that all nested-loop prints for this cycle are done.' }
                            ]
                          },
                          {
                            text: 'delay(pauseMs);',
                            blocks: [
                              { id: 'mc-cat-3-4-loops-ex2-tip-17', type: 'markdown', content: '**Pause and repeat forever.**\n\nWaits 4 seconds, then the Arduino `loop()` function starts the next batch again.' }
                            ]
                          }
                        ]
                      }
                    },
                    { id: 'mc-programming-loops-4-code', type: 'markdown', content: 'If this code runs, the Serial Monitor output for one full cycle would look like:\n\n```\nPrint #1 -> outer=2, inner=1\nPrint #2 -> outer=2, inner=2\nPrint #3 -> outer=4, inner=1\nPrint #4 -> outer=4, inner=2\nPrint #5 -> outer=6, inner=1\nPrint #6 -> outer=6, inner=2\nPrint #7 -> outer=8, inner=1\nPrint #8 -> outer=8, inner=2\nPrint #9 -> outer=10, inner=1\nPrint #10 -> outer=10, inner=2\nBatch complete. Waiting before repeat...\n```\n\nThen the program waits about **4 seconds** (`delay(4000)`) and prints the same pattern again from `Print #1`.' }
                  ]},

                  { id: 'mc-prog-loops-6', type: 'markdown', content: '# While Loops\n\nA `while` loop is another control structure that allows you to repeat a block of code, but it continues to run as long as a specified condition is true. To view the conditions, please refer to the previous section on conditional statements. The structure looks like this:' },
                  { id: 'mc-prog-loops-7', type: 'codetooltip', content: 'while (condition) \n{\n  // Code to repeat\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      {
                        text: 'while',
                        blocks: [
                          { id: 'mc-cat-3-4-loops-tip-18', type: 'markdown', content: '**Start of while loop.**\n\nThis loop will continue to execute as long as the specified condition is true.' }
                        ]
                      },
                      {
                        text: 'condition',
                        blocks: [
                          { id: 'mc-cat-3-4-loops-tip-19', type: 'markdown', content: '**Loop continuation condition.**\n\nThe code inside the loop will keep running as long as this condition evaluates to true. Once it becomes false, the loop will stop and the program will continue with the next line of code after the loop.' }
                        ]
                      },
                      {
                        text: 'Code to repeat',
                        blocks: [
                          { id: 'mc-cat-3-4-loops-tip-20', type: 'markdown', content: 'Code to run \`while\` condition is true'}
                        ]
                      }
                    ]
                  }},

                  {id: 'mc-prog-loops-8', type: 'note', content: 'Be careful with while loops! If the condition never becomes false, you will create an infinite loop that can crash your program. Always make sure there is a way for the condition to become false at some point.\n\nFor example, if you write `while (true) { ... }`, this loop will run forever because the condition is always true. To avoid this, you can include a statement inside the loop that changes the condition, such as `while (count < 10) { count++; }`.' },

                  {id: 'mc-prog-loops-9', type: 'markdown', content: '## While loop examples...'},
                  {id: 'mc-prog-loops-10',
                    type: 'dropdown',
                    content: 'While loop example 1: counting to 5',
                    children: [
                      {
                        id: 'mc-prog-loops-10-code',
                        type: 'codetooltip',
                        content: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int count = 1;\n\n  while (count <= 5) {\n    Serial.print("Count: ");\n    Serial.println(count);\n    count++;\n  }\n\n  Serial.println("Done counting. Restarting...");\n  delay(2000);\n}',
                        metadata: {
                          language: 'cpp',
                          parts: [
                            {
                              text: 'void setup() {',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-1', type: 'markdown', content: '**Runs once at startup.**\n\n`setup()` is where we initialize hardware and communication before the repeated logic in `loop()` begins.' }
                              ]
                            },
                            {
                              text: 'Serial.begin(9600);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-2', type: 'markdown', content: '**Start Serial communication.**\n\nThis opens the Serial Monitor connection at `9600` baud so we can print text and numbers for debugging.' }
                              ]
                            },
                            {
                              text: 'void loop() {',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-3', type: 'markdown', content: '**Main repeating function.**\n\nArduino runs `loop()` continuously, so this whole counting example repeats forever.' }
                              ]
                            },
                            {
                              text: 'int count = 1;',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-4', type: 'markdown', content: '**Initialize the loop counter.**\n\n`count` starts at `1` and will be increased each time the while loop runs.' }
                              ]
                            },
                            {
                              text: 'while (count <= 5)',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-5', type: 'markdown', content: '**While-loop condition.**\n\nThe code inside this loop runs only while `count` is less than or equal to `5`.' },
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-6', type: 'note', content: 'This condition is checked before every iteration. Once `count` becomes `6`, the loop stops and execution moves to the next line after the loop.' }
                              ]
                            },
                            {
                              text: 'Serial.print("Count: ");',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-7', type: 'markdown', content: '**Print a label without a newline.**\n\n`print` keeps the cursor on the same line so the next value appears beside this text.' }
                              ]
                            },
                            {
                              text: 'Serial.println(count);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-8', type: 'markdown', content: '**Print the current count value.**\n\n`println` outputs `count` and then moves to a new line in the Serial Monitor.' }
                              ]
                            },
                            {
                              text: 'count++;',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-9', type: 'markdown', content: '**Increment the counter.**\n\n`count++` is shorthand for `count = count + 1`; this is what eventually makes the while condition false.' },
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-10', type: 'note', content: 'If you forget this line, `count` never changes and the loop becomes infinite (`count <= 5` stays true forever).' }
                              ]
                            },
                            {
                              text: 'Serial.println("Done counting. Restarting...");',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-11', type: 'markdown', content: '**Post-loop status message.**\n\nThis line runs after the `while` finishes, confirming that counting is complete for this cycle.' }
                              ]
                            },
                            {
                              text: 'delay(2000);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex1-tip-12', type: 'markdown', content: '**Pause before restarting.**\n\nWaits 2000 milliseconds (2 seconds), then `loop()` starts over and counts from 1 to 5 again.' }
                              ]
                            }
                          ]
                        }
                      },

                      { id: 'mc-prog-loops-11', type: 'note', content: 'Conditionals operate in the same way here as they do in \`if\` statements - that is, each loop iteration, the conditional is **evaluated** to either \`true\` or \`false\`, and the loop behaves accordingly.' }
                    ]
                  },

                  {
                    id: 'mc-prog-loops-12',
                    type: 'dropdown',
                    content: 'While loop example 2: pause until button is pressed',
                    children: [
                      {
                        id: 'mc-prog-loops-12-code',
                        type: 'codetooltip',
                        content: 'const int buttonPin = 2;\nconst int ledPin = 13;\n\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  Serial.println("Waiting for button press...");\n\n  while (digitalRead(buttonPin) == HIGH) {\n    delay(10);\n  }\n\n  Serial.println("Button pressed! Running action...");\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n\n  while (digitalRead(buttonPin) == LOW) {\n    delay(10);\n  }\n}',
                        metadata: {
                          language: 'cpp',
                          parts: [
                            {
                              text: 'const int buttonPin = 2;',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-1', type: 'markdown', content: '**Define the button input pin.**\n\nThis constant stores which GPIO pin the button is connected to.' }
                              ]
                            },
                            {
                              text: 'const int ledPin = 13;',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-2', type: 'markdown', content: '**Define the LED output pin.**\n\nWe will blink this LED after the button is pressed so there is visible feedback.' }
                              ]
                            },
                            {
                              text: 'pinMode(buttonPin, INPUT_PULLUP);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-3', type: 'markdown', content: '**Configure button as pull-up input.**\n\nWith `INPUT_PULLUP`, the pin reads `HIGH` when idle and `LOW` when the button is pressed to ground.' },
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-4', type: 'note', content: 'This is why the while conditions use `== HIGH` for waiting and `== LOW` for waiting-release.' }
                              ]
                            },
                            {
                              text: 'pinMode(ledPin, OUTPUT);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-5', type: 'markdown', content: '**Configure LED pin as output.**\n\nThis lets us drive the LED `HIGH` and `LOW` later in the program.' }
                              ]
                            },
                            {
                              text: 'Serial.begin(9600);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-6', type: 'markdown', content: '**Start Serial Monitor output.**\n\nUseful for debugging and for seeing exactly when the code is waiting or reacting.' }
                              ]
                            },
                            {
                              text: 'while (digitalRead(buttonPin) == HIGH)',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-7', type: 'markdown', content: '**Pause here until press.**\n\nAs long as the button is not pressed, the pin stays `HIGH` and this while loop keeps running.' },
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-7b', type: 'note', content: 'Since we perform a \`digitalRead\` every time in the condition, we get **fresh data from the button**. This ensures the program responds immediately when the button state changes. If we instead used a variable to store the button state before the loop, the program might miss a press unless we update the variable inside the loop itself.' }
                              ]
                            },
                            {
                              text: 'delay(10);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-8', type: 'markdown', content: '**Short wait inside polling loop.**\n\nThis reduces CPU usage and helps avoid overly aggressive pin polling.' }
                              ]
                            },
                            {
                              text: 'digitalWrite(ledPin, HIGH);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-9', type: 'markdown', content: '**Trigger action after press.**\n\nOnce the wait loop ends, we know the button was pressed, so we turn the LED on.' }
                              ]
                            },
                            {
                              text: 'delay(500);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-10', type: 'markdown', content: '**Keep LED on briefly.**\n\nThis makes the action visible and clearly tied to the button press event.' }
                              ]
                            },
                            {
                              text: 'digitalWrite(ledPin, LOW);',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-11', type: 'markdown', content: '**Turn LED back off.**\n\nCompletes one full response cycle for a single button press.' }
                              ]
                            },
                            {
                              text: 'while (digitalRead(buttonPin) == LOW)',
                              blocks: [
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-12', type: 'markdown', content: '**Wait for button release.**\n\nThis prevents retriggering repeatedly while the button is still being held down.' },
                                { id: 'mc-cat-3-4-loops-while-ex2-tip-13', type: 'note', content: 'A common pattern is: **wait-for-press**, run action once, then **wait-for-release** before allowing the next trigger.' }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  },

                  
                  
                ]
              },

              { id: "mc-prog-uart",
                title: "UART / Serial Communication",
                description: "Sending and receiving data over serial connections.",
                blocks: [
                  { id: 'mc-prog-uart-1', type: 'markdown', content: 'UART (Universal Asynchronous Receiver/Transmitter) (*sometimes called \`Serial Communication\`*) is a common protocol for serial communication between microcontrollers and other devices. It allows you to send and receive data one bit at a time over a single wire (plus ground). In Arduino, we use the `Serial` library to work with UART communication.\n\n- **Universal** refers to the wide compatability of this protocol\n- **Asynchronous** means data is sent without a clock signal, but *must agree on a data transmission rate (baudrate)*\n- **Receiver/Transmitter** indicates data can be both sent and receieved. This protocol uses two wires between devices - one for sending and one for recieving.' },

                  { id: 'mc-prog-uart-2', type: 'markdown', content: '# How is data exchanged\n\nIn UART communication, 1s and 0s are sent one by one, typically packaged in small packets called **frames**. The 1s and 0s are represented by different voltages, which typically depend on the application: \n\n- Arduino/Raspberry pi use **TTL (Transistor-Transistor Logic)**, where a \`0\` is represented by \`0V\` and a \`1\` is represented by \`3.3V\` or \`5V\`. \n- In industrail equipment, the voltage levels match the **RS-232** standard, where \`0\` is represented by \`-12V\` and \`1\` is represented by \`+12V\`.\n\nWhen there is no communication happening on the line, the line holds at a positive voltage (*referred to as idle*). When communication happens, each of the **frames** typically consists of:\n\n1. **Start bit**: Indicates the beginning of a new data packet (always `LOW`)\n2. **Data bits**: The actual data being sent (usually 8 bits, i.e. a *byte*)\n3. **Parity bit**: An optional bit used for error checking\n4. **Stop bit(s)**: Indicates the end of the data packet (always `HIGH`)' },

                  { id: 'mc-prog-uart-3', type: 'webimage', content: 'https://controllerstech.com/wp-content/uploads/2025/10/arduino2_1.webp', metadata: {alt: 'Image depicting the voltage levels of UART communication, showing the start bit (LOW), data bits (varies), parity bit (optional), and stop bit (HIGH). The image shows how 1s are represented by a positive 3.3V or 5V signal, while 0s are represented by a 0V signal. The line is idle at a positive voltage when no communication is happening.'}},

                  { id: 'mc-prog-uart-4', type: 'markdown', content: '# How fast is data exchanged?\n\nThe speed of UART communication is determined by the **baud rate**, which is the number of bits transmitted per second. Common baud rates include `9600`, `115200`, and `250000` bits per second. **Both devices communicating over UART must be set to the same baud rate to understand each other correctly**. If we want to find the amount of time it takes to send a single byte, we can use the formula:\n\n```\nTime per byte = (Start bit + Data bits + Parity bit + Stop bit) / Baud rate\n```\n\nFor example, with 8 data bits, no parity, 1 stop bit, and a baud rate of 9600:\n\n```\nTime per byte = (1 + 8 + 0 + 1) / 9600 ≈ 0.001 seconds (1 ms)\n```' },

                  { id: 'mc-prog-uart-5', type: 'markdown', content: '# Starting UART\n\nTo start UART, we need to open the port on our microcontroller using the `Serial.begin(baudrate)` function. This function initializes the serial communication at the specified baud rate.' },

                  { id: 'mc-prog-uart-6', type: 'markdown', content: 'The Pico microcontroller features **three UART ports** (UART0, UART1, and UART2), which can be used for simultaneous communication with multiple devices. In contrast, the Arduino Uno has only one UART port (Serial), which is shared with the USB connection to the computer. This means that on an Arduino Uno, you cannot use the Serial Monitor while also communicating with another device over UART without additional hardware (like a software serial library or an external USB-to-serial adapter). To use UART1 or UART2 on the Pico, we say \`Serial1.begin(baudrate)\` or \`Serial2.begin(baudrate)\`.' },

                  { id: 'mc-prog-uart-7', type: 'codetooltip', content: 'void setup() {\n  Serial.begin(9600);  // Starts USB Serial port\n  Serial1.begin(9600); // Starts UART1 Port (check pinout for connections)\n  Serial2.begin(9600); // Starts UART2 Port (check pinout for connections)\n}', metadata: {
                    language: 'cpp',
                  } },
                  { id: 'mc-prog-uart-7a', type: 'markdown', content: '- Note, we don\'t have to use all three UART ports at the same time. The code above just shows how you would enable each of them. Use each line as needed!\n- Also, remember to ensure your baudrates on your computer, controller, or other devices all match!'},

                  { id: 'mc-prog-uart-8', type: 'markdown', content: '# 🎛️From Microcontroller to Computer\n\nBefore proceeding down the next secion, please review the ASCII table, found in the [🔗Variables and Datatypes Section](https://schomath.github.io/academy-backend/?course=microcontrollers&module=mc-prog-variables).\n\nIn the Arduino langauge, there are two ways to send data from the microcontroller to the other devices: \`Serial.print()\` and \`Serial.write()\`\n\n## Serial.print() and Serial.println()'},

                  { id: 'mc-prog-uart-9', type: 'codetooltip', content: 'Serial.print("Value is: ");\nSerial.println(123);', metadata: {
                    language: 'cpp',
                    parts: [
                      {
                        text: 'Serial.print("Value is: ");',
                        blocks: [{id: 'mc-cat-3-4-uart-tip-1', type: 'markdown', content: '**Print text without newline.**\n\nThis will output `Value is: ` and keep the cursor on the same line for the next print statement.' }]
                      },
                      {
                        text: 'Serial.println(123);',
                        blocks: [{id: 'mc-cat-3-4-uart-tip-2', type: 'markdown', content: '**Print data with newline.**\n\nThis will output `123`, in addition to a **new line character**, which moves the cursor to the next line in the Serial Monitor.'}]
                      },
                    ]
                  }},
 
                  { id: 'mc-prog-uart-10', type: 'markdown', content: 'Running those code, we would see \`Value is: 123\` in the Serial Monitor.\n\nWhen you use `Serial.print()` or `Serial.println()`, the data is converted to human-readable text. For example, if you print the integer `123`, the \`Serial.print\` function automatically converts the integer numbers \`1\`, \`2\`, and \`3\` to the *characters* \`"1"\`, \`"2"\`, and \`"3"\` in the Serial Monitor.' },

                  { id: 'mc-prog-uart-11', type: 'markdown', content: '## Serial.write()\n\nThe `Serial.write()` function sends data as raw bytes. This means that if you send an integer using `Serial.write(123);`, it will send the byte value `123` (which is `0x7B` in hexadecimal) rather than the characters `1`, `2`, and `3`. This is useful for sending binary data or when you want to communicate with another device that expects data in a specific byte format.' },

                  { id: 'mc-prog-uart-11a', type: 'dropdown', content: 'Serial.print() vs Serial.write() example', children: [
                    { id: 'mc-prog-uart-11a', type: 'codetooltip', content: 'int my_value = 65;\n\nSerial.print(my_value);\nSerial.write(my_value);', metadata: {
                      language: 'cpp',
                      parts: [
                        {text: 'my_value', blocks: [{id: 'mc-cat-3-4-uart-tip-3', type: 'markdown', content: '**Variable to send.**\n\nThis variable holds the integer value `65`.' }]},
                        { text: 'Serial.print(my_value);', blocks: [{id: 'mc-cat-3-4-uart-tip-4', type: 'markdown', content: '**Print variable as text.**\n\nSends the **character** `6` then the **character** `5`. This will output `65` in the Serial Monitor, as human-readable text.' }]},
                        { text: 'Serial.write(my_value);', blocks: [{id: 'mc-cat-3-4-uart-tip-5', type: 'markdown', content: '**Write variable as raw byte.**\n\nSends the **byte value** `65`, which corresponds to the ASCII character `A`. This will output `A` in the Serial Monitor, since it interprets the byte value as a character based on the ASCII encoding.' }]}
                      ]
                    }},
                    { id: 'mc-prog-uart-11b', type: 'markdown', content: 'If we were to run this code, we\'d see the following outputs:\n- `65` would be printed to the console first, since `Serial.print()` sends the character `6` then `5`.\n- Next, we\'d see `A` printed to the console, since `Serial.write()` sends the byte value `65`, which corresponds to the ASCII character `A`.'},
                  ]},

                  { id: 'mc-prog-uart-11b', type: 'note', content: 'The **big takeaway** is to use `Serial.print()` for human-readable text when communicating with a Serial Monitor, and `Serial.write()` when you want to send data to another processor or device.' },

                  { id: 'mc-prog-uart-12', type: 'markdown', content: '# 🖥️From Computer to Microcontroller\n\nTo receive data sent from the computer to the microcontroller, we can use the `Serial.read()` function. This function reads incoming data one byte at a time. Before reading, we should check if there is any data available using `Serial.available()`, which returns the number of bytes available to read.\n\nHere is an example of how to read data from the Serial Monitor:'},

                  { id: 'mc-prog-uart-13', type: 'codetooltip', content: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  if (Serial.available() > 0) {\n    byte incomingByte = Serial.read();\n    // Do something with the byte...\n  }\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      {
                        text: 'if',
                        blocks: [
                          { id: 'mc-cat-3-4-uart-receive-tip-1', type: 'markdown', content: 'First, we set up a **conditional statement**, as we only want to read from the serial buffer if there is data available.' }
                        ]
                      },
                      {
                        text: 'Serial.available()',
                        blocks: [
                          { id: 'mc-cat-3-4-uart-receive-tip-2', type: 'markdown', content: '`Serial.available()` returns the number of bytes available to read from the serial buffer.' },
                          { id: 'mc-cat-3-4-uart-receive-tip-3', type: 'note', content: 'If `Serial.available()` returns `0`, it means there is no data to read, and we should not call `Serial.read()` because it would cause strange behaviour' }
                        ]
                      },
                      {
                        text: '> 0',
                        blocks: [
                          { id: 'mc-cat-3-4-uart-receive-tip-4', type: 'markdown', content: 'This condition essentially says "only run the if statement if there is at least one byte of data available to read."' }
                        ]
                      },
                      {
                        text: 'byte incomingByte = Serial.read();',
                        blocks: [
                          { id: 'mc-cat-3-4-uart-receive-tip-4', type: 'markdown', content: '**Read the incoming byte.**\n\n`Serial.read()` reads one byte from the serial buffer and returns it. We store this value in the variable `incomingByte`.' }
                        ]
                      }
                    ]
                  }},

                  { id: 'mc-prog-uart-14', type: 'markdown', content: '### ‼️Computers Send `char` types!\n\nAn important note to keep in mind is that if you are **transmitting data from a computer**, it will **always send as a `char`**. For example, if I type\ `123`, the computer is actually sending three separate `char` values: `\'1\'`, `\'2\'`, and `\'3\'`. If you want to send numbers, please see the next sections on `Serial.parseInt()`, and `Serial.parseFloat()`.' },

                  


                  // { id: 'mc-prog-uart-14', type: 'markdown', content: 'Now that we have this byte, we can do any number of things with it! For a refresher on how we can handle this data, refer to the previous sections on variables types and navigate to the section on 🔁Casting (converting types): [🔗Variable and Data Types](https://schomath.github.io/academy-backend/?course=microcontrollers&module=mc-prog-variables).' },

                  { id: 'mc-prog-uart-15', type: 'dropdown', content: 'Serial.read() example 1: Toggle the LED', children: [
                    { id: 'mc-prog-uart-15-code', type: 'codetooltip', content: 'const int ledPin = 13;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  if (Serial.available() > 0) {\n    char incoming_char = Serial.read();\n    if (incoming_char == \'1\') {\n      digitalWrite(ledPin, HIGH);\n    } \n    else if (incoming_char == \'0\') {\n      digitalWrite(ledPin, LOW);\n    }\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'char incoming_char = Serial.read();',
                          blocks: [
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-1', type: 'markdown', content: '**Read incoming byte as char.**\n\nSince data from the computer is sent as `char`, we store the result of `Serial.read()` in a `char` variable.' }]
                        },
                        { text: 'if (incoming_char',
                          blocks: [
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-2', type: 'markdown', content: '**Check if the char is \'1\'.**\n\nIf the incoming character is `\'1\'`, we turn the LED on.' },
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-3', type: 'note', content: 'Remember that `\'1\'` is a character, which is different from the integer `1`. The character `\'1\'` has an ASCII byte value of `49`.' }
                          ]
                        },
                        { text: '\'1\'',
                          blocks: [
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-3b', type: 'markdown', content: 'We use the \' single quotes to denote a character literal in C++. Remember, we\'re comparing characters, not integers.' }
                          ]
                        },
                        { text: 'else if (incoming_char',
                          blocks: [
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-4', type: 'markdown', content: '**Check if the char is \'0\'.**\n\nIf the incoming character is `\'0\'`, we turn the LED off.' },
                          ]
                        },
                        { text: '\'0\'',
                          blocks: [
                            { id: 'mc-cat-3-4-uart-receive-ex1-tip-4b', type: 'markdown', content: 'Again, we use single quotes to denote a character literal. The character `\'0\'` has an ASCII byte value of `48`.' }
                          ]
                        }
                      ]
                    }},
                  ]},

                  { id: 'mc-prog-uart-16', type: 'dropdown', content: 'Serial.parseInt() Example: Changing a variable value', children: [
                    { id: 'mc-prog-uart-16-code', type: 'codetooltip', content: 'int my_fav_int = 42;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Check if data is available, and store it if need be:\n  if (Serial.available() > 0) {\n    int incoming_int = Serial.parseInt();\n    my_fav_int = incoming_int;\n  }\n\n  // Regardless, keep spamming console to remind everyone of my favorite int every 3 seconds:\n  Serial.print("My FAV number is: ");\n  Serial.println(my_fav_number);\n  delay(3000);\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'int my_fav_int = 42;', blocks: [
                          { id: 'mc-cat-3-4-uart-receive-ex2-tip-0', type: 'markdown', content: 'It\'s important that we **initialize** `my_fav_int` here at the start of our program, so that it has a default value before we receive anything from the computer. This way, if we run the program without sending any data, it will still print out `My FAV number is: 42` every 3 seconds.' }
                        ]},
                        { text: 'int incoming_int = Serial.parseInt();', blocks: [
                          { id: 'mc-cat-3-4-uart-receive-ex2-tip-1', type: 'markdown', content: '**Read incoming integer.**\n\n`Serial.parseInt()` reads the incoming data as an integer.' }
                        ]},
                        { text: '// Regardless, keep spamming console to remind everyone of my favorite int every 3 seconds:', blocks: [
                          { id: 'mc-cat-3-4-uart-receive-ex2-tip-2', type: 'markdown', content: 'We choose the following to be outside of the `if (Serial.available() > 0)` statement as we ALWAYS want this code to trigger, even if there isn\'t anything sent from the computer!' }
                        ]}
                      ]
                    }},
                  ]}
                ]
              },

              { id: 'mc-prog-analog', 
                title: 'Analog: Reading and Writing', 
                description: 'Working with analog devices.', 
                blocks: [
                  { id: 'mc-prog-analog-1', type: 'markdown', content: '# True Analog Signals\n\nWhile discrete signals are characterized by either bing *full voltage* (3.3V) or *no voltage* (0V), **analog signals** can take on voltages between these values, providing a continous adjustable range. This allows our microcontrollers to be able to write to and read from more advanced signals that can do more than just `ON` or `OFF`.' },

                  { id: 'mc-prog-analog-2', type: 'image', content: 'mc_prog_analog_signal.png', metadata: { alt: 'Graph showing a continuous analog signal varying smoothly between 0V and 3.3V over time, as opposed to a discrete digital signal which only switches between 0V and 3.3V with no intermediate values.', format: 'no-shadow'}},

                  { id: 'mc-prog-analog-3', type: 'markdown', content: '# 📥Reading Analog Signals\n\nSince our hardware must be specifically *designed* to read an analog signal, we must use GPIO ports that are **tied to the Pico\'s ADC (Analog-Digital Converter)**. You will notice tha these ports correspond to ports `GP26`, `GP27`, and `GP28`.\n\nTo read an analog signal, we use the `analogRead(pin)` function. This function reads the voltage on the specified analog pin and returns a value that represents that voltage. The returned value is typically an integer between `0` and `1023` for a 10-bit ADC (Analog-to-Digital Converter), where `0` corresponds to `0V` and `1023` corresponds to the reference voltage (usually `3.3V` or, in some other models, `5V`).' },

                  { id: 'mc-prog-analog-3a', type: 'image', content: 'mc_prog_analog_read.png', metadata: { alt: 'Diagram showing how the `analogRead()` function maps a continuous voltage signal to a discrete integer value. The voltage range from 0V to 3.3V is divided into 1024 steps (for a 10-bit ADC), where each step corresponds to an integer value from 0 to 1023. For example, a voltage of approximately 1.65V would correspond to an `analogRead()` value of around 512.', format: 'no-shadow'}},

                  { id: 'mc-prog-analog-3b', type: 'dropdown', content: 'Example: Reading a potentiometer value', children: [
                    { id: 'mc-prog-analog-3b-code', type: 'codetooltip', content: 'const int potPin = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(potPin, INPUT);\n}\n\nvoid loop() {\n  int potValue = analogRead(potPin);\n  Serial.print("Potentiometer value: ");\n  Serial.println(potValue);\n  delay(1000);\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'const', blocks: [{id: 'mc-cat-3-4-analog-read-ex1-tip-1', type: 'markdown', content: 'This variable will be constant' }]},
                        { text: 'int', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-2', type: 'markdown', content: 'This variable will be an integer' }
                        ]},
                        { text: 'potPin = 10', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-3', type: 'markdown', content: 'We will connect our potentiometer to GPIO 10!' }]},
                        { text: 'void setup() {', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-4', type: 'markdown', content: 'Remember, setup runs once!' }
                        ]},
                        { text: 'Serial.begin(9600);', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-5', type: 'markdown', content: 'Start communication with the computer so we can send it data.'}]},
                        { text: 'pinMode(potPin, INPUT);', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-6', type: 'markdown', content: 'Set the potentiometer pin as an input so we can read its value.'}]},
                        { text: 'void loop() {', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-7', type: 'markdown', content: 'Remember, loop runs forever!' }
                        ]},
                        { text: 'int potValue', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-8', type: 'markdown', content: 'We declare an `integer` value and label it potValue.\nNote, since we are re-declaring this every time void loop() {...} runs, the previous value is discarded and replaced with the new value.' }
                        ]},
                        { text: 'analogRead(potPin)', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex1-tip-9', type: 'markdown', content: 'Read the value from the potentiometer pin. This will be an integer between 0 and 1023, representing the voltage level on that pin.'}]},
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-analog-3c', type: 'dropdown', content: 'Example: Using map to get the voltage from the potentiometer value', children: [
                    { id: 'mc-prog-analog-3c-code', type: 'codetooltip', content: 'const int potPin = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(potPin, INPUT);  // Don\'t forget to set your potentiometer pin as input!\n}\n\nvoid loop() {\n  int potValue = analogRead(potPin);\n  float voltage = map(potValue, 0, 1023, 0, 3300) / 1000.0;\n  Serial.print("Voltage: ");\n  Serial.print(voltage);\n  Serial.println(" V");\n  delay(1000);\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'pinMode(potPin, INPUT);', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex2-tip-1', type: 'markdown', content: '**Set potentiometer pin as input.**\n\nThis allows us to read the voltage value from the potentiometer.' }
                        ]},
                        { text: 'float voltage', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex2-tip-1', type: 'markdown', content: 'We declare a `float` variable to store the voltage value. We use `float` instead of `int` because voltage can have decimal values.' }
                        ]},
                        { text: 'analogRead(potPin)', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex2-tip-3', type: 'markdown', content: 'Read the potentiometer value, which is an integer between 0 and 1023.' }
                        ]},
                        { text: 'map(potValue, 0, 1023, 0, 3300)', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex2-tip-4', type: 'markdown', content: '**Map potentiometer value to voltage.**\n\nThe `map()` function takes the `potValue` (which ranges from 0 to 1023) and maps it to a new range of 0 to 3300 (representing millivolts). This gives us the voltage in millivolts.' }
                        ]},
                        { text: '/ 1000.0', blocks: [
                          { id: 'mc-cat-3-4-analog-read-ex2-tip-5', type: 'markdown', content: '**Convert millivolts to volts.**\n\nSince the `map()` function gives us the voltage in millivolts, we divide by 1000.0 to convert it to volts.'}
                        ]}
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-analog-4', type: 'markdown', content: '# 📤Writing Analog Signals with PWM\n\nWhile some microcontrollers have true analog output pins, the Raspberry Pi Pico does not. Instead, we can simulate an analog output using a technique called **Pulse Width Modulation (PWM)**, which we will discuss in the *next section (WIP)*.\n\nTo create an analog signal that varies between `0V` and `3.3V`, we use the `analogWrite()` function, which takes two arguments:' },

                  { id: 'mc-prog-analog-4b', type: 'codetooltip', content: 'analogWrite(pin, level);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'analogWrite', blocks: [
                        { id: 'mc-cat-3-4-analog-write-tip-1', type: 'markdown', content: 'This function is used to write an analog value (PWM signal) to a pin.' }
                      ]},
                      { text: 'pin', blocks: [
                        { id: 'mc-cat-3-4-analog-write-tip-2', type: 'markdown', content: 'The GPIO pin you want to write the signal to. This pin must support PWM output (check your microcontroller\'s datasheet for details).' }
                      ]},
                      { text: 'level', blocks: [
                        { id: 'mc-cat-3-4-analog-write-tip-3', type: 'markdown', content: 'The strength of an analog signal.\nPutting `0` here will give 0V, while putting `255` here will give 3.3V. Values in between will give a corresponding voltage between 0 and 3.3V.'}
                      ]}
                    ]
                  }},

                  { id: 'mc-prog-analog-4c', type: 'note', content: 'Note, we can **write** an analog signal to any GPIO pin on the Pico. However, on other microcontrollers, some pins may only be designed to work with digital signals. You can find out if your pin on your microcontroller supports analog output by checking the pinout on the datasheet and looking for pins marked with a `~`.'},

                  { id: 'mc-prog-analog-4d', type: 'image', content: 'mc_prog_analog_write.png', metadata: { alt: 'Graph showing how Pulse Width Modulation (PWM) simulates an analog signal. The graph depicts a series of square waves with varying duty cycles. A higher duty cycle (more time spent at HIGH voltage) corresponds to a stronger signal, while a lower duty cycle (more time spent at LOW voltage) corresponds to a weaker signal. For example, a 75% duty cycle means the signal is HIGH for 75% of the time and LOW for 25% of the time, simulating a stronger analog output.', format: 'no-shadow'}},

                  { id: 'mc-prog-analog-4e', type: 'dropdown', content: 'Example: Gradually Increasing brightness on an LED', children: [
                    { id: 'mc-prog-analog-4e-code', type: 'codetooltip', content: 'const int ledPin = 9;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  // Fade in the LED\n  for (int brightness = 0; brightness <= 255; brightness++) {\n    analogWrite(ledPin, brightness);\n    delay(10);\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'for', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-1', type: 'markdown', content: 'To increase the brightness, we\'ll use a **for** loop.'},
                        ]},
                        { text: 'int brightness = 0;', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-2', type: 'markdown', content: 'We initialize the `brightness` variable to `0`,which means no brightness!' }
                        ]},
                        { text: 'brightness <= 255;', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-3', type: 'markdown', content: 'We want to keep increasing brightness until we reach `255`, which is the maximum brightness (corresponding to 3.3V).' }
                        ]},
                        { text: 'brightness++', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-4', type: 'markdown', content: 'Each time the **for** loop runs, we increase the `brightness` variable by `1`.'}
                        ]},
                        { text: 'analogWrite', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-5', type: 'markdown', content: 'We call the `analogWrite` function to tell the microcontroller we\'re going to set a voltage on the LED pin.'}
                        ]},
                        { text: 'ledPin', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-6', type: 'markdown', content: 'This is the pin we connected our LED to.'}
                        ]},
                        { text: 'brightness', blocks: [
                          { id: 'mc-cat-3-4-analog-write-ex1-tip-7', type: 'markdown', content: 'This variable controls the strength of the signal we\'re sending to the LED. As `brightness` increases, the LED will get brighter!'}
                        ]}
                      ]
                    }},
                  ]}
              ] },

              { id: 'mc-prog-pwm', 
                title: 'PWM: Simulating Analog Output', 
                description: 'Using Pulse Width Modulation to create variable signals.', 
                blocks: [

              ]},

              { id: 'mc-prog-funcs', 
                title: 'Functions',
                description: 'Defining and using functions to structure your code.',
                blocks: [
                  { id: 'mc-prog-funcs-1', type: 'markdown', content: '# ❓What is a Function?\n\nMuch like how variables are used to *store data* for use later, **functions** are used to *store blocks of code* for use later. A **function** is a reusable block of code that performs a specific task. Functions allow us to break down complex problems into smaller, more manageable pieces, and they help us avoid repeating code. In the Arduino programming language (which is based on C++), we can define our own functions to organize our code and make it more readable.\n\n'},

                  { id: 'mc-prog-funcs-1a', type: 'image', content: 'mc_prog_func_anat.png', metadata: { alt: 'Diagram showing the anatomy of a function declaration in C++. The function is defined as `float AddTwoNumbersTheCoolWay(float a, float b)`. The return type is `float`, the function name is `AddTwoNumbersTheCoolWay`, and it has two parameters: `float a` and `float b`. The function body is enclosed in curly braces `{ ... }` and contains the code that will be executed when the function is called.', format: 'no-shadow'}},

                  { id: 'mc-prog-funcs-1b', type: 'markdown', content: '### ✨Return Type\n\nFunctions can *optionally* return a value after they are done executing. The **return type** of a function specifies the type of value that the function will return. If a function does not return any value, we use the return type `void`. As an example, consider the functions `digitalWrite()` and `digitalRead()`:'},

                  { id: 'mc-prog-funcs-1c', type: 'codetooltip', content: 'digitalWrite(pin, value);\nbool read_value = digitalRead(pin);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'digitalWrite(pin, value);', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-1', type: 'markdown', content: '**digitalWrite()** does not return anything (`void`), so we cannot assign its result to a variable.' }
                      ]},
                      { text: 'read_value', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-2', type: 'markdown', content: '**digitalRead()** returns a `boolean` value, which we can store in the variable `read_value`.'}
                      ]}
                    ]
                  }},

                  { id: 'mc-prog-funcs-1d', type: 'markdown', content: '- `digitalWrite()` has a return type of `void`, since it does not return any value. It simply performs an action (writing a HIGH or LOW value to a pin) without giving us any information back.\n- `digitalRead()`, on the other hand, has a return type of `boolean`, since it returns a value that represents the state of the pin (HIGH or LOW). This allows us to store the result of `digitalRead()` in a variable and use that information later in our program.'},

                  { id: 'mc-prog-funcs-1e', type: 'markdown', content: '### ✨Function Name\n\nThe **function name** is the identifier we use to call the function later in our code. It should be descriptive of what the function does. For example, `digitalWrite` is a good function name because it clearly indicates that the function is used to write a digital value to a pin.'},

                  { id: 'mc-prog-funcs-1f', type: 'markdown', content: '### ✨Parameters\n\n**Parameters** are the inputs that we pass to a function when we call it. They allow us to provide the function with the information it needs to perform its task. Consider the following two function calls:'},

                  { id: 'mc-prog-funcs-1g', type: 'codetooltip', content: 'digitalWrite(13, HIGH);\nmap(analogValue, 0, 1023, 0, 255);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: '13', blocks: [{ id: 'mc-cat-3-4-funcs-tip-3', type: 'markdown', content: 'First parameter, an integer' }]},
                      { text: 'HIGH', blocks: [{ id: 'mc-cat-3-4-funcs-tip-4', type: 'markdown', content: 'Second parameter, a boolean' }]},
                      { text: 'analogValue', blocks: [{ id: 'mc-cat-3-4-funcs-tip-5', type: 'markdown', content: 'First parameter, a variable representing the value to be mapped' }]},
                      { text: '0', blocks: [{ id: 'mc-cat-3-4-funcs-tip-6', type: 'markdown', content: 'Second parameter, the lower bound of the input range' }]},
                      { text: '1023', blocks: [{ id: 'mc-cat-3-4-funcs-tip-7', type: 'markdown', content: 'Third parameter, the upper bound of the input range' }]},
                      { text: '0', blocks: [{ id: 'mc-cat-3-4-funcs-tip-8', type: 'markdown', content: 'Fourth parameter, the lower bound of the output range' }]},
                      { text: '255', blocks: [{ id: 'mc-cat-3-4-funcs-tip-9', type: 'markdown', content: 'Fifth parameter, the upper bound of the output range' }]}
                    ]
                  }},

                  { id: 'mc-prog-funcs-1h', type: 'markdown', content: '- In the call `digitalWrite(13, HIGH)`, the parameters are an integer, which we set to `13`, and a boolean, which we set to `HIGH`. The `13` tells the function which pin to write to, and `HIGH` tells it what value to write.\n- In the call `map(analogValue, 0, 1023, 0, 255)`, there are five parameters: `analogValue`, `0`, `1023`, `0`, and `255`. These parameters provide the function with the information it needs to perform the mapping operation.'},
                  
                  // { id: 'mc-prog-funcs-1a', type: 'markdown', content: 'When declaring a function, there are several things we must tell the computer:\n\n- **return type**: should our reusable chunk of code return a value, and if so, what type of value? For example, `digitalWrite` does not return anything, since the code just writes a `HIGH` or `LOW` value to a pin. However, `digitalRead` **returns** a `boolean` value that is either HIGH or LOW - i.e. it gives us information back!\n- **function name**: the name of the function, which is used to call it later. For example, `digitalWrite` and `digitalRead` are both the names of functions.\n- **parameters**: sometimes, we want to pass our code some information to work with. These are called parameters. When we write `digitalRead(15`, the `15` is considered a *parameter* that tells the `digitalRead` function what pin to read from.\n\n# 💡How do I create and use my own functions?\nFunctions are used in two different ways: **declaration** and **calling**. *You\'ve actually already called many functions throughout this class!*\n\n- **Declaring a function** means we specify what that function does. Think of it as creating a *to-do* list of code to run, but not actually running them yet.\n- **Calling our function** means we take the to-do list and actually run through the code.\n\nThe advantage of structuring code in this way is that if we need to execute several lines of codes in different places in our program, we can instead put it all in a `function` and just call that function in a single line of code.\n\n## Declaring the Function\n\nDeclaring a function is like writing a to-do list without actually doing the tasks - in the below example, we declare the function `AddTwoNumbersTheCoolWay`, which takes in two decimal numbers (floats) and returns their sum as a float. We haven\'t actually called this function yet, so the code inside of it won\'t run until we call it later on in our program. *note, we place this code below `void loop()` and `void setup()`, but it could actually be placed anywhere in our program!*'},

                  { id: 'mc-prog-func-2', type: 'markdown', content: '# 🛠️Declaring a Function\n\nDeclaring a function typically happens outside of the `void setup()` and `void loop()` functions. It involves telling the computer a few things about our chunk of code:\n- `return type` is stated first. If the function doesn\'t return anything, we say `void`.\n- `Function Name` cames next - remember, this cannot have spaces in it and cannot begin with numbers!\n - `Input Parameters` are then placed between the a set of parenthesis `(...)`. If multiple arguments are required, they are separated with a comma.\n- `The Body` of the function is then placed between curley brackets `{...}`'},
                  
                  { id: 'mc-prog-funcs-2a', type: 'codetooltip', content: 'void setup() {\n  //...\n}\n\nvoid loop() {\n  //...\n}\n\n// FUNCTION DECLARATION for my custom adding two numbers function\n\nfloat AddTwoNumbersTheCoolWay(float a, float b) {\n  // Create temporary variable to store the sum in:\n  float c = a + b;\n  // Return the numbers out of the function\n  return c;\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'float', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-1', type: 'markdown', content: 'This is the **return type** of the function. It indicates that this function will return a float value.' }
                      ]},
                      { text: 'AddTwoNumbersTheCoolWay', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-2', type: 'markdown', content: 'This is the **function name**. It is used to call the function later in the code.' }
                      ]},
                      { text: 'float a', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-3', type: 'markdown', content: 'This is the first **parameter** of the function. It is a float named `a` that will be used as input when we call the function.' }
                      ]},
                      { text: 'float b', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-4', type: 'markdown', content: 'This is the second **parameter** of the function. It is a float named `b` that will be used as input when we call the function.' }
                      ]},
                      { text: '{', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-5', type: 'markdown', content: 'This curly brace indicates the start of the function body, which contains the code that will be executed when the function is called.' }
                      ]},
                      { text: 'float c = a + b;', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-6', type: 'markdown', content: 'Inside the function, we create a temporary variable `c` to store the sum of `a` and `b`.' }, { id: 'mc-cat-3-4-funcs-tip-7', type: 'note', content: 'The variable `c` has a scope only inside of this function - meaning the rest of my program will never have any idea that `c` exists.'}
                      ]},
                      { text: 'return c;', blocks: [
                        { id: 'mc-cat-3-4-funcs-tip-8', type: 'markdown', content: 'The `return` statement sends the value of `c` back to the caller of the function. Since we declared the return type as `int`, the value of `c` will be converted to an integer before being returned.' }
                      ]}
                    ]},
                  },

                  { id: 'mc-prog-funcs-3', type: 'markdown', content: '# 📞Calling the Function\n\nNow that we have declared our function, we can call it from anywhere else in our program. When we call a function, we provide the necessary parameters (if any) and the code inside the function will execute. The function will then return a value if it has a return type other than `void`.' },

                  { id: 'mc-prog-funcs-4', type: 'codetooltip', content: 'void setup() {\n  //...\n}\n\nvoid loop() {\n  float result = AddTwoNumbersTheCoolWay(3.5, 2.5);\n  Serial.print("The result is: ");\n  Serial.println(result);\n}\n\nfloat AddTwoNumbersTheCoolWay(float a, float b) {\n  // Create temporary variable to store the sum in:\n  float c = a + b;\n  // Return the numbers out of the function\n  return c;\n}', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'float result', blocks: [
                        { id: 'mc-cat-3-4-funcs-call-tip-1', type: 'markdown', content: 'Since the function `AddTwoNumbersTheCoolWay` returns a `float`, we store the result in a variable of type `float`.' }
                      ]},
                      { text: 'AddTwoNumbersTheCoolWay(3.5, 2.5)', blocks: [
                        { id: 'mc-cat-3-4-funcs-call-tip-2', type: 'markdown', content: 'We call the function `AddTwoNumbersTheCoolWay` and pass in the values `3.5` and `2.5` as parameters. The function will execute and return the sum of these two numbers, which will be stored in the variable `result`.' }
                      ]}
                    ]
                  }},

                  { id: 'mc-prog-funcs-5', type: 'markdown', content: 'Note how we use parentheses `()` to pass arguments to the function when we call it. These are called **positional arguments** as the order we pass them to the function matters. In this case...\n\n- The first argument `3.5` is assigned to the parameter `a`.\n- The second argument `2.5` is assigned to the parameter `b`.\n\nYou can then see how `a` ad `b` are added together inside of the function down in the *function definition*.\n\n# 💡Examples' },

                  { id: 'mc-prog-funcs-1c1', type: 'dropdown', content: 'Example: Creating a function with No Return Type', children: [
                    { id: 'mc-prog-funcs-1c1-code', type: 'codetooltip', content: 'void loop() {\n  delay(1000);\n  blinkLED(3);\n}\n\nvoid blinkLED(int times) {\n  for (int i = 0; i < times; i++) {\n    digitalWrite(LED_BUILTIN, HIGH);\n    delay(500);\n    digitalWrite(LED_BUILTIN, LOW);\n    delay(500);\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        {text: 'blinkLED(3);', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c1a', type: 'markdown', content: 'Here, we call the `blinkLED` function and pass it the parameter `3`, which tells the function to blink the LED 3 times.' }]},
                        {text: 'void blinkLED', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c1b', type: 'markdown', content: 'This is the function declaration. The return type is `void`, which means this function does not return any value.' }]},
                        {text: 'int times', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c1c', type: 'markdown', content: 'This is a parameter of type `int`. When we call the function, we can pass an integer value to it, which will be used within the function to determine how many times to blink the LED.' }]}
                      ]
                    }},
                    {id: 'mc-prog-funcs-1c1a', type: 'markdown', content: '- In this example, we define a function called `blinkLED` that takes an integer parameter `times` and blinks the built-in LED that many times. Since `blinkLED` does not return any value, its return type is `void`.\n- We notice how we can pass the parameter `3` to the blink LED function, which sets `times` to 3, causing our `for` loop to execute 3 times!'}
                  ]},

                  { id: 'mc-prog-funcs-6a', type: 'dropdown', content: 'Example: Creating a function with a Return Type', children: [
                    { id: 'mc-prog-funcs-1c2-code', type: 'codetooltip', content: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  float sensorValue = readSensor();\n  Serial.print("Sensor value: ");\n  Serial.println(sensorValue);\n  delay(1000);\n}\n\nfloat readSensor() {\n  // This function automatically maps our analog value to the proper range and returns it!\n  int raw_value = analogRead(10);\n  float value = map(raw_value, 0, 1023, 0, 255);\n  return value;\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        {text: 'float sensorValue', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c2a', type: 'markdown', content: 'Here, we declare a variable `sensorValue` of type `float`. This will store the **mapped** sensor value from our function.' }]},
                        {text: 'readSensor();', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c2b', type: 'markdown', content: 'We call the `readSensor` function, which returns a `float` value that we store in `sensorValue`.' }]},
                        {text: 'float readSensor()', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c2c', type: 'markdown', content: 'This is the function declaration. The return type is `float`, which means this function will return a floating-point number when it is done executing.' }]},
                        {text: 'return value;', blocks: [{ id: 'mc-cat-3-4-funcs-tip-1c2d', type: 'markdown', content: 'The `return` statement specifies the value that will be returned by the function. In this case, we return the variable `value`, which is a `float` that represents the mapped sensor value.' }]}
                      ]
                    }},
                    {id: 'mc-prog-funcs-6b', type: 'markdown', content: '- In this example, we define a function called `readSensor` that reads an analog value from pin 10, maps it to a range of 0 to 255, and returns the result as a `float`. Since `readSensor` returns a value, its return type is `float`.\n- We call the `readSensor` function in our `loop()` and store the returned value in the variable `sensorValue`, which we then print to the serial monitor.'}
                ]},
                ]
              },

              { id: 'mc-prog-arrays',
                title: 'Arrays',
                description: 'Storing Multiple Values in a Single Variable',
                blocks: [
                  { id: 'mc-prog-arrays-1', type: 'markdown', content: '# Arrays in Arduino\n\nAn array is a group of values stored under one name. All items should usually be the same type. Arrays are useful when you want to store several related values, like sensor readings, LED pins, or test scores.' },

                  { id: 'mc-prog-arrays-2', type: 'note', content: 'Arrays are **fixed size**. If you make an array with 5 spots, it stays at 5 spots. Also, the first item starts at index `0`.' },

                  { id: 'mc-prog-arrays-3', type: 'codetooltip', content: 'int readings[5] = {10, 20, 30, 40, 50};', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'int', blocks: [{ id: 'mc-prog-arrays-3a', type: 'markdown', content: 'Each item is an integer.' }] },
                      { text: 'readings', blocks: [{ id: 'mc-prog-arrays-3b', type: 'markdown', content: 'This is the array name.' }] },
                      { text: '[5]', blocks: [{ id: 'mc-prog-arrays-3c', type: 'markdown', content: 'This array holds 5 values.' }] },
                      { text: '= {', blocks: [{ id: 'mc-prog-arrays-3d', type: 'markdown', content: 'These values fill the array.' }] },
                      { text: '10, 20, 30, 40, 50', blocks: [{ id: 'mc-prog-arrays-3e', type: 'markdown', content: 'Each number goes into one spot.' }] },
                      { text: '};', blocks: [{ id: 'mc-prog-arrays-3f', type: 'markdown', content: 'The semicolon ends the statement.' }] }
                    ]
                  }},

                  { id: 'mc-prog-arrays-4', type: 'markdown', content: 'Use brackets `[]` to read or change a single item. Remember: `readings[0]` is the first item, `readings[1]` is the second, and so on.' },

                  { id: 'mc-prog-arrays-5', type: 'codetooltip', content: 'int firstReading = readings[0];\nint lastReading = readings[4];', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'readings[0]', blocks: [{ id: 'mc-prog-arrays-5a', type: 'markdown', content: 'This gets the first item.' }] },
                      { text: 'readings[4]', blocks: [{ id: 'mc-prog-arrays-5b', type: 'markdown', content: 'This gets the fifth item.' }] }
                    ]
                  }},

                  { id: 'mc-prog-arrays-6', type: 'dropdown', content: 'Example: print every value in an array', children: [
                    { id: 'mc-prog-arrays-6a', type: 'markdown', content: 'A `for` loop is a common way to move through every item in an array.' },
                    { id: 'mc-prog-arrays-6b', type: 'codetooltip', content: 'int readings[] = {10, 20, 30, 40, 50};\n\nvoid setup() {\n  Serial.begin(9600);\n\n  for (int i = 0; i < 5; i++) {\n    Serial.println(readings[i]);\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'int readings[] = {10, 20, 30, 40, 50};', blocks: [{ id: 'mc-prog-arrays-6c', type: 'markdown', content: 'The array is created with 5 values.' }] },
                        { text: 'for (int i = 0; i < 5; i++) {', blocks: [{ id: 'mc-prog-arrays-6d', type: 'markdown', content: '`i` counts through the array.' }] },
                        { text: 'Serial.println(readings[i]);', blocks: [{ id: 'mc-prog-arrays-6e', type: 'markdown', content: 'This prints the current item.' }] }
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-arrays-7', type: 'markdown', content: 'You can also change one item at a time. This is useful when a new sensor value comes in or when you want to update a list.' },

                  { id: 'mc-prog-arrays-8', type: 'codetooltip', content: 'int scores[3] = {8, 9, 7};\nscores[1] = 10;', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'scores[1]', blocks: [{ id: 'mc-prog-arrays-8a', type: 'markdown', content: 'This points to the second item.' }] },
                      { text: '= 10;', blocks: [{ id: 'mc-prog-arrays-8b', type: 'markdown', content: 'This changes that item.' }] }
                    ]
                  }},

                  { id: 'mc-prog-arrays-9', type: 'dropdown', content: 'Example: turn several LEDs on and off', children: [
                    { id: 'mc-prog-arrays-9a', type: 'markdown', content: 'Arrays work well for pin lists. Here, one loop controls three LEDs.' },
                    { id: 'mc-prog-arrays-9b', type: 'codetooltip', content: 'const int ledPins[] = {2, 3, 4};\n\nvoid setup() {\n  for (int i = 0; i < 3; i++) {\n    pinMode(ledPins[i], OUTPUT);\n  }\n}\n\nvoid loop() {\n  for (int i = 0; i < 3; i++) {\n    digitalWrite(ledPins[i], HIGH);\n    delay(200);\n    digitalWrite(ledPins[i], LOW);\n  }\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'const int ledPins[] = {2, 3, 4};', blocks: [{ id: 'mc-prog-arrays-9c', type: 'markdown', content: 'This stores the pin numbers.' }] },
                        { text: 'pinMode(ledPins[i], OUTPUT);', blocks: [{ id: 'mc-prog-arrays-9d', type: 'markdown', content: 'Each pin is set as an output.' }] },
                        { text: 'digitalWrite(ledPins[i], HIGH);', blocks: [{ id: 'mc-prog-arrays-9e', type: 'markdown', content: 'This turns one LED on.' }] },
                        { text: 'digitalWrite(ledPins[i], LOW);', blocks: [{ id: 'mc-prog-arrays-9f', type: 'markdown', content: 'This turns it off.' }] }
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-arrays-10', type: 'markdown', content: 'If you want the size of an array, you can calculate it with `sizeof`.' },

                  { id: 'mc-prog-arrays-11', type: 'codetooltip', content: 'int readings[] = {10, 20, 30, 40, 50};\nint count = sizeof(readings);', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'sizeof(readings)', blocks: [{ id: 'mc-prog-arrays-11a', type: 'markdown', content: 'This gets the total size in bytes.' }] },
                      { text: 'count', blocks: [{ id: 'mc-prog-arrays-11c', type: 'markdown', content: 'This becomes the number of items.' }] }
                    ]
                  }},

                  { id: 'mc-prog-arrays-12', type: 'dropdown', content: 'Example: average several sensor readings', children: [
                    { id: 'mc-prog-arrays-12a', type: 'markdown', content: 'Here, we store several readings, add them up, and find the average.' },
                    { id: 'mc-prog-arrays-12b', type: 'codetooltip', content: 'int readings[] = {100, 102, 98, 101, 99};\nint sum = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n\n  for (int i = 0; i < 5; i++) {\n    sum += readings[i];\n  }\n\n  float average = sum / 5.0;\n  Serial.println(average);\n}', metadata: {
                      language: 'cpp',
                      parts: [
                        { text: 'int readings[] = {100, 102, 98, 101, 99};', blocks: [{ id: 'mc-prog-arrays-12c', type: 'markdown', content: 'These are the sample values.' }] },
                        { text: 'sum += readings[i];', blocks: [{ id: 'mc-prog-arrays-12d', type: 'markdown', content: 'Add each value to the total.' }] },
                        { text: 'float average = sum / 5.0;', blocks: [{ id: 'mc-prog-arrays-12e', type: 'markdown', content: 'Divide by a decimal to keep the answer as a decimal.' }] }
                      ]
                    }}
                  ]},

                  { id: 'mc-prog-arrays-13', type: 'markdown', content: 'Arrays can also hold characters. A character array can store a short message.' },

                  { id: 'mc-prog-arrays-14', type: 'codetooltip', content: 'char message[] = "Hi!";', metadata: {
                    language: 'cpp',
                    parts: [
                      { text: 'char', blocks: [{ id: 'mc-prog-arrays-14a', type: 'markdown', content: 'Each item is a character.' }] },
                      { text: 'message', blocks: [{ id: 'mc-prog-arrays-14b', type: 'markdown', content: 'This is the array name.' }] },
                      { text: '"Hi!"', blocks: [{ id: 'mc-prog-arrays-14c', type: 'markdown', content: 'The text goes inside quotes.' }] }
                    ]
                  }},

                  { id: 'mc-prog-arrays-15', type: 'markdown', content: 'A good rule is to use arrays when you have many similar values and want to process them with a loop.' },
                ]
              }

              // .. more modules here...
            ]
          },

          { id: 'mc-wireless',
            title: 'Wireless Communication',
            emoji: '📡',
            modules: [
              { id: 'mc-wireless-intro',
                title: 'Introduction to Wireless Communication & Setup',
                description: 'Overview of wireless communication methods for microcontrollers.',
                blocks: [
                  { id: 'mc-wireless-intro-1', type: 'markdown', content: '# 📡Introduction to Wireless Communication\n\nWireless communication allows microcontrollers to send and receive data without physical connections. Common methods include Wi-Fi, Bluetooth, and RF modules. Each method has its own advantages and use cases, such as Wi-Fi for internet connectivity, Bluetooth for short-range communication, and RF modules for long-range communication.' },

                  { id: 'mc-wireless-intro-setup', type: 'markdown', content: '# ⚙️Getting the Correct Compiler\n\nTo use wireless communication modules on your **Raspberry Pi Pico**, we have to install a seperate compiler that better supports the wireless hardware on the Pico.\n\nIn your board manager, search for `pico` and install the compiler `Raspberry Pi Pico/RP2040` by **Earle Philhower**.' },

                  { id: 'mc-wireless-intro-setup-2', type: 'image', content: 'mc_prog_wifi_library.png', metadata: { caption: 'Installing the correct library for wireless communication on the Raspberry Pi Pico.' }}
                ]
              },

              {
                id: 'mc-wireless-simplewebapp',
                title: 'Simple Web App',
                description: 'Create a simple web application to control your microcontroller remotely.',
                blocks: [
                  
                ]
              }
            ]
          },

          { id: 'mc-ctrlarch',
            title: 'Control Architectures',
            emoji: '🏗️',
            modules: [
              { id: 'mc-ctrlarch-sched',
                title: 'Task Scheduling',
                description: 'Implementing cooperative and preemptive multitasking on microcontrollers.',
                blocks: [
                  { id: 'mc-ctrlarch-sched-1', type: 'markdown', content: '# Task Scheduling on Microcontrollers\n\nTask scheduling is a method of managing multiple tasks or processes on a microcontroller. It allows the microcontroller to switch between different tasks, giving the illusion of multitasking. The simplest type of task scheduling is a **timer-based task scheduler**, where each task (*i.e. read a sensor, print a message, update a variable*) is scheduled to run at *regular intervals*' },

                  { id: 'mc-ctrlarch-sched-2', type: 'markdown', content: 'In a timer-based task scheduler, we can use a timer interrupt to trigger the execution of tasks at specific intervals. For example, we might want to read a sensor every 100 milliseconds, update a display every 500 milliseconds, and send data over a network every 1000 milliseconds. By using a timer interrupt, we can ensure that each task runs at the correct time without blocking the main program flow.' },

                  { id: 'mc-ctrlarch-schedu-2', type: 'video', content: 'https://www.youtube.com/embed/hD3cR25MbW8?si=eUPSXj89bMFRRNGf' },
                ]
              }
            ]
          },

          { id: 'mc-pbl',
            title: 'Project-Based Learning',
            emoji: '🔨',
            modules: [
              // Project Stuff
              {
                id: 'mc-pbl-projects',
                title: 'Projects',
                description: 'Apply your skills to real-world challenges with hands-on projects.',
                blocks: [
                  { id: 'mc-pbl-1', type: 'markdown', content: '# Introduction\n\nThis is a small list of example projects for students to work on for their final projects, as well as study to understand the expectations of the final project.'},

                  { id: 'mc-pbl-2', type: 'markdown', content: '# 🌉Model Drawbridge & Traffic Light\n\nIn this project, you will build a model drawbridge that can be raised and lowered using a servo motor. The drawbridge will have traffic lights on either side to indicate when it is safe to cross. You will also use a distance sensor to count the number of objects that pass through the drawbridge.\n\n- **Bridge**: A servo motor controls the raising and lowering of the drawbridge\n- **Traffic Signals**: 3 LEDs act as traffic lights. *The bridge raises on red, then lowers before turning green*.\n- **Extra**: A sonar sensor can be used to count cars passing by.'},

                  { id: 'mc-pbl-3', type: 'markdown', content: '# 🏠Smart Home System\n\nIn this project, you will create a simple smart home system using an Arduino. The system will include a temperature sensor to monitor the room temperature, a light sensor to detect ambient light levels, and a relay to control a lamp. You will also implement a basic user interface using an LCD display and buttons to allow the user to set temperature thresholds and control the lamp manually.\n\n- **Temperature Monitoring**: Use a temperature sensor to read the current room temperature and display it on the LCD.\n- **Light Detection**: Use a light sensor to measure ambient light levels and display them on the LCD. Alternatively, you could use it to create a nightlight system.\n- **Lamp Control**: Use a relay to turn a lamp on or off based on user input from buttons or automatically based on light levels.'},

                  { id: 'mc-pbl-4', type: 'markdown', content: '# 🛜Remote Control System\n\nIn this project, you will design a remote control system using an Arduino and an infrared (IR) remote. The system will allow you to control various devices, such as LEDs, motors, or a small robot, using the buttons on the IR remote. You will learn how to read signals from the IR remote and use them to trigger different actions on your Arduino.\n\n- **IR Remote Control**: Use an IR receiver to read signals from the remote and decode them.\n- **Device Control**: Map different buttons on the remote to control various devices, such as turning LEDs on/off or controlling motor speed and direction.\n- **Extra**: Implement a feedback mechanism, such as an LCD display, to show which button was pressed or the current state of the devices.\n- **Extra**: Use a relay to control larger devices, such as sending a signal to a PLC or toggling a larger power supply.'},

                  { id: 'mc-pbl-5', type: 'markdown', content: '# 📡Radar System\n\nIn this project, you will build a simple radar system using an ultrasonic sensor and a servo motor. The ultrasonic sensor will be mounted on the servo motor, allowing it to rotate and scan the surrounding area. The system will measure the distance to objects in its path and display the information on an LCD screen or send it to a computer for visualization.\n\n- **Ultrasonic Sensor**: Use an ultrasonic sensor to measure distances to nearby objects.\n- **Servo Motor**: Mount the ultrasonic sensor on a servo motor to allow it to rotate and scan the area.\n- **Data Visualization**: Display the distance measurements on an LCD screen or send them to a computer for real-time visualization using software like Processing or Python.'}
                ]
              },

              // Wireless Project Stuff
              {
                id: 'mc-pbl-w',
                title: 'Wireless Projects',
                description: 'Projects focused on wireless communication and IoT applications.',
                blocks: [
                  { id: 'mc-pbl-w-1a', type: 'note', content: 'Wireless projects can be more difficult to debug and test, especially for beginners. It is recommended that students have a solid understanding of the basics of microcontroller programming and hardware interfacing before attempting wireless projects.'},
                  { id: 'mc-pbl-w-1b', type: 'note', content: 'Wireless projects require a different compiler than our current setup. Please follow the instructions in [🔗Introduction to Wireless Communication & Setup](https://schomath.github.io/academy-backend/?course=microcontrollers&module=mc-wireless-intro) to install the correct compiler for wireless communication on the Raspberry Pi Pico.'},

                  { id: 'mc-pbl-w-2', type: 'markdown', content: '# 🏠Wireless Smarthome App\n\nIn this project, you will create a wireless smart home system using Raspberry Pi Pico W microcontrollers. The system will allow you to control various devices, such as lights, fans, or sensors, remotely via a web interface or mobile app.\n\n- **Wireless Control**: Use the Pico W to connect to a Wi-Fi network and control devices remotely.\n- **Device Integration**: Integrate various sensors and actuators to create a fully functional smart home system.\n- **Web Interface**: Implement a web interface to monitor and control the devices in real-time.'},

                  { id: 'mc-pbl-w-3', type: 'markdown', content: '# 📡Wireless Sensor Transfer\n\nUsing two Picos (a transmitter and receiver), send a UDP package from one Pico (such as accelerometer data) to the other, and have the other Pico control a servo motor based on the position of the accelerometer.\n\n- **Transmitter**: Read sensor data on one Pico and send it wirelessly using UDP.\n- **Receiver**: Receive the packet on the second Pico and map the incoming values to a servo position.\n- **Extra**: Add an LED, buzzer, or display to show when data is being received successfully.'}
                ]
              }
            ]
          },


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
            description: 'An outline of the Robotics Architecture Course',
            blocks: [
              {id: 'robai-arch-intro-1', type: 'markdown', content: '# What is Robot Architecture?\n\nRobot architecture refers to the overall design and structure of a robotic system, encompassing the \`mathematical representation\`, the \`physical construction\`, and the \`control systems\` which make up the robot. It involves the arrangement of sensors, actuators, processors, and communication interfaces to enable the robot to perform its intended tasks effectively.\n\nIn this class, we will focus both on the **mathematical representation** of robotic systems (i.e. how to model a robot\'s structure and movement using mathematical tools) as well as the **physical design** of robotic systems (i.e. how to choose and arrange components to build a functional robot).'},
              {id: 'robai-arch-intro-2', type: 'markdown', content: '# Outline of the Course\n\n 1. **Foundations of Spatial Architecture**: Configuration space, Rigid Bodies, and Transformations. \n 2. **Kinematics of Robotic Systems**: Forward Kinematics, Jacobian Matrix, and Inverse Kinematics. \n 3. **Dynamics & Planning**: Dynamics of Open Chains, Trajectory Planning, and Motion Planning. \n 4. **Control Systems for Robotics**: Various control strategies for robots.'},
              {id: 'robai-arch-intro-3', type: 'markdown', content: '# Resources\n\n The content in this course is heavily sourced from the fantastic book **[📖Modern Robotics](https://modernrobotics.org/)**, written by *Kevin M. Lynch* and *Frank C. Park*.'}
            ]
          },

          { id: 'robai-arch-rev',
            title: 'Review of Linear Algebra',
            description: 'A refresher on linear algebra concepts essential for robotics.',
            blocks: [
              {id: 'robai-arch-rev-1', type: 'markdown', content: '# Review of Linear Algebra\n\nLinear algebra is the language of robotics: we use it to represent position, orientation, velocity, and force, and to compute how systems move.'},
              {id: 'robai-arch-rev-2', type: 'note', content: 'When viewing equations, you can hover over certain terms for an expanded explanations of what the variables represent and/or where the numbers are coming from.'},
              {id: 'robai-arch-rev-3', type: 'markdown', content: '## Vectors and Dimensionality\n\nA **vector** is an ordered list of numbers that can represent a direction, displacement, force, or velocity. The number of entries is the vector\'s **dimension**, which tells us what space it lives in.\n\n- A 2D vector has 2 components and lives in a plane\n- A 3D vector has 3 components and lives in space\n\nIn robotics, vectors are used constantly: joint velocities, end-effector positions, and force directions are all vector quantities.'},
              {id: 'robai-arch-rev-4', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: '\\mathbf{v}', blocks: [
                    {id: 'robai-arch-rev-4-intro', type: 'markdown', content: 'This is a vector, denoted in bold to distinguish it from scalar quantities. The letter "v" is commonly used to represent velocity, but it could represent any vector quantity depending on the context.'}
                  ]},
                  {expression: ' = ', blocks: []},
                  {expression: '\\begin{bmatrix}2 \\\\ -1 \\\\ 4\\end{bmatrix} ', blocks: [
                    {id: 'robai-arch-rev-4-a', type: 'markdown', content: 'This is a **3D vector** because it has 3 components. You can interpret it as movement of +2 in x, -1 in y, and +4 in z.'},
                  ]},
                  {expression: '\\in \\mathbb{R}^3', blocks: [
                    {id: 'robai-arch-rev-4-b', type: 'markdown', content: 'This notation means that the vector lives in **3D space**. The \`R\` indicates these are *real numbers*, and the superscript 3 indicates the number of dimensions.'}
                  ]}
                ]
              }},

              {id: 'robai-arch-rev-5', type: 'markdown', content: '## Unit Vectors and the Zero Vector\n\nA **unit vector** has magnitude 1, so it encodes pure direction. A **zero vector** has all components equal to 0 and represents no direction and no magnitude.\n\nUnit vectors are the building blocks of coordinate frames. The zero vector often appears as a neutral element in vector addition and as a baseline in equations.'},
              {id: 'robai-arch-rev-6', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: '\\hat{\\mathbf{u}} = \\begin{bmatrix}1 \\\\ 0 \\\\ 0\\end{bmatrix}', blocks: [
                    {id: 'robai-arch-rev-6-a', type: 'markdown', content: 'This is a unit vector in the x-direction. Its length is 1, so it captures direction only.'}
                  ]},
                  {expression: '\\quad , \\quad', blocks: []},
                  {expression: '\\mathbf{0} = \\begin{bmatrix}0 \\\\ 0 \\\\ 0\\end{bmatrix}', blocks: [
                    {id: 'robai-arch-rev-6-b', type: 'markdown', content: 'This is the zero vector. It has magnitude 0 and does not point in any direction.'}
                  ]}
                ]
              }},

              {id: 'robai-arch-rev-7', type: 'markdown', content: '## Dot Product\n\nThe **dot product** combines two vectors into a single scalar. It is useful for measuring alignment between directions and for projecting one vector onto another.\n\n- Positive value: generally similar direction\n- Zero: perpendicular\n- Negative: generally opposite direction'},
              {id: 'robai-arch-rev-8', type: 'latextooltip', content: '', metadata: {
                displayMode: true,
                parts: [
                  {expression: '\\mathbf{a} \\cdot \\mathbf{b} = \\sum_i a_i b_i', blocks: [
                    {id: 'robai-arch-rev-8-a', type: 'markdown', content: 'Multiply matching components and add the results. This is one of the most common operations in robotics and physics.'}
                  ]}
                ]
              }},
              {id: 'robai-arch-rev-9', type: 'dropdown', title: 'Dot Product Example', content: '', children: [
                {id: 'robai-arch-rev-9-1', type: 'latex', content: '\\begin{bmatrix}1 \\\\ 3 \\\\ -2\\end{bmatrix} \\cdot \\begin{bmatrix}4 \\\\ -1 \\\\ 2\\end{bmatrix} = 1(4) + 3(-1) + (-2)(2) = -3'},
                {id: 'robai-arch-rev-9-2', type: 'markdown', content: 'The result is negative, indicating the vectors are more opposed than aligned.'}
              ]},

              {id: 'robai-arch-rev-10', type: 'markdown', content: '## Orthogonality\n\nTwo vectors are **orthogonal** if they are perpendicular. The easiest algebraic test is the dot product: if $\\mathbf{a} \\cdot \\mathbf{b}=0$, the vectors are orthogonal.'},
              {id: 'robai-arch-rev-10-latex', type: 'latex', content: '\\mathbf{a} \\cdot \\mathbf{b} = 0'} ,
              {id: 'robai-arch-rev-11', type: 'dropdown', title: 'Orthogonality Example', content: '', children: [
                {id: 'robai-arch-rev-11-1', type: 'latex', content: '\\mathbf{a}=\\begin{bmatrix}1 \\\\ 2\\end{bmatrix}, \\quad \\mathbf{b}=\\begin{bmatrix}2 \\\\ -1\\end{bmatrix}'},
                {id: 'robai-arch-rev-11-2', type: 'latex', content: '\\mathbf{a} \\cdot \\mathbf{b} = 1(2) + 2(-1) = 0'},
                {id: 'robai-arch-rev-11-3', type: 'markdown', content: 'Since the dot product is 0, these vectors are perpendicular.'}
              ]},

              {id: 'robai-arch-rev-12', type: 'markdown', content: '## Matrices and Core Operations\n\nA **matrix** is a rectangular arrangement of numbers. In robotics, matrices are used to represent linear transformations, coordinate changes, and systems of equations.\n\nThe most common operations are addition/subtraction, scalar multiplication, and matrix multiplication.'},
              {id: 'robai-arch-rev-13', type: 'dropdown', title: 'Matrix Addition and Subtraction', content: '', children: [
                {id: 'robai-arch-rev-13-1', type: 'latex', content: 'A=\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix},\\; B=\\begin{bmatrix}5 & 6 \\\\ 7 & 8\\end{bmatrix}'},
                {id: 'robai-arch-rev-13-2', type: 'latex', content: 'A+B=\\begin{bmatrix}6 & 8 \\\\ 10 & 12\\end{bmatrix}'},
                {id: 'robai-arch-rev-13-3', type: 'latex', content: 'A-B=\\begin{bmatrix}-4 & -4 \\\\ -4 & -4\\end{bmatrix}'}
              ]},
              {id: 'robai-arch-rev-14', type: 'dropdown', title: 'Scalar Multiplication', content: '', children: [
                {id: 'robai-arch-rev-14-1', type: 'latex', content: '3A = 3\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix} = \\begin{bmatrix}3 & 6 \\\\ 9 & 12\\end{bmatrix}'}
              ]},
              {id: 'robai-arch-rev-15', type: 'dropdown', title: 'Matrix Multiplication (Square and Non-Square)', content: '', children: [
                {id: 'robai-arch-rev-15-1', type: 'markdown', content: 'To multiply matrices, the **inner dimensions must match**. If $A$ is $m\\times n$ and $B$ is $n\\times p$, then $AB$ exists and has size $m\\times p$.\n\nEach entry is computed as a row-column dot product: take one row from the first matrix and one column from the second matrix.'},
                {id: 'robai-arch-rev-15-1-latex', type: 'latex', content: '(m\\times n)(n\\times p) \\rightarrow (m\\times p)'},
                {id: 'robai-arch-rev-15-2', type: 'markdown', content: '### Example 1: Square Multiplication (2×2 · 2×2)'},
                {id: 'robai-arch-rev-15-3', type: 'latex', content: 'A=\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix},\\quad C=\\begin{bmatrix}2 & 0 \\\\ 1 & 2\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-4', type: 'latextooltip', content: '', metadata: {
                  displayMode: true,
                  parts: [
                    {expression: '(AC)_{11}', blocks: [
                      {id: 'robai-arch-rev-15-4-a', type: 'markdown', content: 'The entry in **row 1, column 1** of the product matrix `AC`.'}
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '1\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-4-b', type: 'markdown', content: '`1` is from row 1 of `A`, column 1 value. `2` is from column 1 of `C`, row 1 value.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '2\\cdot1', blocks: [
                      {id: 'robai-arch-rev-15-4-c', type: 'markdown', content: '`2` is from row 1 of `A`, column 2 value. `1` is from column 1 of `C`, row 2 value.'}
                    ]},
                    {expression: ' = 4', blocks: [
                      {id: 'robai-arch-rev-15-4-d', type: 'markdown', content: 'This finishes the dot product of row 1 of `A` with column 1 of `C`.'}
                    ]},
                    {expression: '\\quad', blocks: []},
                    {expression: '(AC)_{12}', blocks: [
                      {id: 'robai-arch-rev-15-4-e', type: 'markdown', content: 'The entry in **row 1, column 2** of `AC`.'}
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '1\\cdot0', blocks: [
                      {id: 'robai-arch-rev-15-4-f', type: 'markdown', content: '`1` comes from row 1 of `A`. `0` comes from column 2 of `C`, row 1.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '2\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-4-g', type: 'markdown', content: '`2` comes from row 1 of `A`. The second `2` comes from column 2 of `C`, row 2.'}
                    ]},
                    {expression: ' = 4', blocks: [
                      {id: 'robai-arch-rev-15-4-h', type: 'markdown', content: 'This is the dot product of row 1 of `A` with column 2 of `C`.'}
                    ]}
                  ]
                }},
                {id: 'robai-arch-rev-15-5', type: 'latextooltip', content: '', metadata: {
                  displayMode: true,
                  parts: [
                    {expression: '(AC)_{21}', blocks: [
                      {id: 'robai-arch-rev-15-5-a', type: 'markdown', content: 'The entry in **row 2, column 1** of `AC`.'}
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '3\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-5-b', type: 'markdown', content: '`3` is from row 2 of `A`, column 1. `2` is from column 1 of `C`, row 1.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '4\\cdot1', blocks: [
                      {id: 'robai-arch-rev-15-5-c', type: 'markdown', content: '`4` is from row 2 of `A`, column 2. `1` is from column 1 of `C`, row 2.'}
                    ]},
                    {expression: ' = 10', blocks: [
                      {id: 'robai-arch-rev-15-5-d', type: 'markdown', content: 'This finishes the dot product of row 2 of `A` with column 1 of `C`.'}
                    ]},
                    {expression: '\\quad', blocks: []},
                    {expression: '(AC)_{22}', blocks: [
                      {id: 'robai-arch-rev-15-5-e', type: 'markdown', content: 'The entry in **row 2, column 2** of `AC`.'}
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '3\\cdot0', blocks: [
                      {id: 'robai-arch-rev-15-5-f', type: 'markdown', content: '`3` comes from row 2 of `A`. `0` comes from column 2 of `C`, row 1.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '4\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-5-g', type: 'markdown', content: '`4` comes from row 2 of `A`. The `2` comes from column 2 of `C`, row 2.'}
                    ]},
                    {expression: ' = 8', blocks: [
                      {id: 'robai-arch-rev-15-5-h', type: 'markdown', content: 'This is the dot product of row 2 of `A` with column 2 of `C`.'}
                    ]}
                  ]
                }},
                {id: 'robai-arch-rev-15-6', type: 'latex', content: 'AC=\\begin{bmatrix}4 & 4 \\\\ 10 & 8\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-7', type: 'markdown', content: '### Example 2: Non-Square Multiplication (2×3 · 3×1)'},
                {id: 'robai-arch-rev-15-8', type: 'latex', content: 'M=\\begin{bmatrix}1 & -1 & 2 \\\\ 0 & 3 & 4\\end{bmatrix},\\quad N=\\begin{bmatrix}2 \\\\ 5 \\\\ -1\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-9', type: 'markdown', content: 'Dimensions: $M$ is $2\\times3$, $N$ is $3\\times1$, so $MN$ is valid and the result is $2\\times1$.'},
                {id: 'robai-arch-rev-15-9-latex', type: 'latex', content: '(2\\times3)(3\\times1) \\rightarrow (2\\times1)'},
                {id: 'robai-arch-rev-15-10', type: 'latextooltip', content: '', metadata: {
                  displayMode: true,
                  parts: [
                    {expression: '(MN)_1', blocks: [
                      {id: 'robai-arch-rev-15-10-tip-1', type: 'markdown', content: 'The **first entry** of the result vector `MN`. Since `MN` is `2×1`, this is the value in row 1, column 1.'}
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '1\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-10-tip-2', type: 'markdown', content: '`1` comes from the **first row of M**: `[1, -1, 2]` (first element). `2` comes from the **first (and only) column of N**: `[2, 5, -1]^T` (first element).'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '(-1)\\cdot5', blocks: [
                      {id: 'robai-arch-rev-15-10-tip-3', type: 'markdown', content: '`-1` is the second element of row 1 in `M`. `5` is the second element of column 1 in `N`.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '2\\cdot(-1)', blocks: [
                      {id: 'robai-arch-rev-15-10-tip-4', type: 'markdown', content: '`2` is the third element of row 1 in `M`. `-1` is the third element of column 1 in `N`.'}
                    ]},
                    {expression: ' = -5', blocks: [
                      {id: 'robai-arch-rev-15-10-tip-5', type: 'markdown', content: 'This is the row-column dot product for row 1 of `M` with column 1 of `N`.'}
                    ]}
                  ]
                }},
                {id: 'robai-arch-rev-15-11', type: 'latextooltip', content: '', metadata: {
                  displayMode: true,
                  parts: [
                    {expression: '(MN)_2', blocks: [
                      {id: 'robai-arch-rev-15-11-tip-1', type: 'markdown', content: 'The **second entry** of the result vector `MN` (row 2, column 1).' }
                    ]},
                    {expression: ' = ', blocks: []},
                    {expression: '0\\cdot2', blocks: [
                      {id: 'robai-arch-rev-15-11-tip-2', type: 'markdown', content: '`0` comes from the **second row of M**: `[0, 3, 4]` (first element). `2` is the first element of column 1 in `N`.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '3\\cdot5', blocks: [
                      {id: 'robai-arch-rev-15-11-tip-3', type: 'markdown', content: '`3` is the second element of row 2 in `M`. `5` is the second element of column 1 in `N`.'}
                    ]},
                    {expression: ' + ', blocks: []},
                    {expression: '4\\cdot(-1)', blocks: [
                      {id: 'robai-arch-rev-15-11-tip-4', type: 'markdown', content: '`4` is the third element of row 2 in `M`. `-1` is the third element of column 1 in `N`.'}
                    ]},
                    {expression: ' = 11', blocks: [
                      {id: 'robai-arch-rev-15-11-tip-5', type: 'markdown', content: 'This completes the second row-column dot product.'}
                    ]}
                  ]
                }},
                {id: 'robai-arch-rev-15-12', type: 'latex', content: 'MN=\\begin{bmatrix}-5 \\\\ 11\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-13', type: 'markdown', content: 'Matrix multiplication is generally **not commutative**, so in most cases $AB \\neq BA$ (and sometimes one order is not even defined).'},
                {id: 'robai-arch-rev-15-13-latex', type: 'latex', content: 'AB \\neq BA'}
              ]},

              {id: 'robai-arch-rev-15-14', type: 'markdown', content: '## Special Matrices and Transpose\n\nSome matrix objects appear so often that they have special names. The **identity matrix** leaves vectors unchanged, the **zero matrix** is the additive neutral element, and the **transpose** swaps rows with columns.\n\nThese ideas are foundational for coordinate transforms and matrix factorizations.'},
              {id: 'robai-arch-rev-15-15', type: 'dropdown', title: 'Identity Matrix Example', content: '', children: [
                {id: 'robai-arch-rev-15-15-1', type: 'latex', content: 'I_2 = \\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix},\\quad A=\\begin{bmatrix}1 & 2 \\\\ 3 & 4\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-15-2', type: 'latex', content: 'I_2A = AI_2 = A'}
              ]},
              {id: 'robai-arch-rev-15-16', type: 'dropdown', title: 'Transpose Example', content: '', children: [
                {id: 'robai-arch-rev-15-16-1', type: 'latex', content: 'A=\\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6\\end{bmatrix} \\Rightarrow A^T=\\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-16-2', type: 'markdown', content: 'Transpose swaps rows and columns.'}
              ]},
              {id: 'robai-arch-rev-15-17', type: 'dropdown', title: 'Zero Matrix Example', content: '', children: [
                {id: 'robai-arch-rev-15-17-1', type: 'latex', content: '0_{2\\times2}=\\begin{bmatrix}0 & 0 \\\\ 0 & 0\\end{bmatrix}'},
                {id: 'robai-arch-rev-15-17-2', type: 'latex', content: 'A + 0_{2\\times2} = A'}
              ]},
              {id: 'robai-arch-rev-15-18', type: 'markdown', content: '## Determinant\n\nThe **determinant** is a scalar computed from a square matrix. It tells us whether the matrix is invertible and how the transformation scales area (2D) or volume (3D).\n\nIf the determinant is 0, the transformation collapses space in at least one direction, so the matrix is not invertible.'},
              {id: 'robai-arch-rev-15-19', type: 'dropdown', title: 'Determinant Examples', content: '', children: [
                {id: 'robai-arch-rev-15-19-1', type: 'latex', content: '\\det\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix} = ad-bc'},
                {id: 'robai-arch-rev-15-19-2', type: 'latex', content: '\\det\\begin{bmatrix}2 & 1 \\\\ 5 & 3\\end{bmatrix} = 2(3)-1(5)=1'},
                {id: 'robai-arch-rev-15-19-3', type: 'latex', content: '\\det\\begin{bmatrix}2 & 4 \\\\ 1 & 2\\end{bmatrix} = 2(2)-4(1)=0'},
                {id: 'robai-arch-rev-15-19-4', type: 'markdown', content: 'A determinant of 0 means the matrix is **singular** (not invertible).'}
              ]}
            ]
          }
        ],
        moduleCategories: [

          { id: 'robai-arch-intro',
            title: 'Foundations of Spatial Architecture',
            emoji: '👍',
            modules: [
              { id: 'robai-arch-intro-confspace',
                title: 'Configuration Space',
                description: 'Understanding the configuration space (C-space) for robot motion planning.',
                blocks: [
                                    // Degrees of Freedom
                  {id: 'robai-arch-intro-confspace-dof-1', type: 'markdown', content: '# Degrees of Freedom (DoF)\n\nThe **degrees of freedom** of a robotic system refer to the number of independent parameters that define its configuration. In other words, it\'s answering the question of *how many numbers (such as positions, angles, etc.) do we need to specify the exact state of the robot?*\n\nFor example, a simple robotic arm with two joints might have 2 degrees of freedom, while a humanoid robot with multiple limbs and joints could have dozens of degrees of freedom.'},

                  // Rigid Bodies
                  {id: 'robai-arch-rb-1', type: 'markdowntooltip', content: '# Rigid Bodies\n\nIn the broadest terms, robots can best be thought of as one or more solid objects connected together. We refer to these solid objects as **rigid bodies**, and the connections between them as **joints**.\n\n', metadata: { 'parts' : 
                      [
                        {
                          text: 'rigid bodies',
                          blocks: [{type: 'markdown', content: 'A single solid object that does not deform. In robotics, we model components like arms, grippers, and sensors as rigid bodies. *Essentially, anything that maintains its shape under normal operating conditions.*'}]
                        },
                        {
                          text: 'joints',
                          blocks: [{type: 'markdown', content: 'The **connections between** rigid bodies that allow for relative motion. Joints are discussed in the following section.'}]
                        }
                      ]
                    }
                },
                  {id: 'robai-arch-rb-2', type: 'markdown', content: 'When discussing rigid bodies, we must first categorize our bodies as **planar** or **spatial**. A planar rigid body is one in which all motion occurs within a single plane (2D), leading to 3 degrees of freedom (DoFs): two translational \`(x, y)\`, and one rotational \`(θ)\`. A spatial rigid body allows for motion in three-dimensional space (3D), resulting in 6 DoFs: three translational \`(x, y, z)\` and three rotational \`(roll, pitch, yaw)\`.'},

                  {id: 'robai-arch-rb-3', type: 'image', content: 'robarch_rb_1.png', metadata: { alt: 'Planar Rigid Body having 3 DoFs, while Spatial Rigid Body has 6 DoFs', format: 'no-shadow', maxWidth: 'full'}},

                  // {id: 'robai-arch-rb-4', type: 'lab', title: 'Planar Rigid Body Lab', content: 'rigid-body-planar'},

                  // Robot Joints
                  { id: 'robai-arch-j-1', type: 'markdown', content: '# Robot Joints\n\nA free-floating square or cube doesn\`t make for a very good robot, which is why we must connect our robot with **joints**. Joints allow for *constrained* motion between rigid bodies. Each type of joint has different mechanical advantages when implemented, but also mathematical implications for kinematics and dynamics. Let\'s explore the common types of joints:\n\n- **Revolute Joint** (R, 1 DoF): Also called a hinge joint, allows for rotation along the hinge axis. In other words, it constrains 5 of the 6 DoFs.\n- **Prismatic Joint** (P, 1 DoF): Allows for translational motion along a single axis, constraining 5 of the 6 DoFs.\n- **Helical Joint** (H, 1 DoF): Sometimes called screw joints, combines rotational and translational motion along a single axis. *While you may think this allows for 2 DoFs, since the rotation and translation are coupled, we only actually have 1 DoF.*\n- **Cylindrical Joint** (C, 2 DoFs): Allows for rotation and translation along a single axis, constraining 2 translational DoFs and 2 rotational DoFs.\n- **Universal Joint** (U, 2 DoFs): Allows for rotation around two perpendicular axes.\n- **Spherical Joint** (S, 3 DoFs): Also called ball-and-socket joints, allows for rotation around all three axes, constraining only the translational DoFs.'},

                  // Grubler's Formula
                  {id: 'robai-arch-grub-1', type: 'markdown', content: '# Grubler\'s Formula\n\nGrubler\'s formula is a fundamental equation in robotics that helps us determine the degrees of freedom (DoF) of a robotic system based on its configuration of rigid bodies and joints. The formula is given by:'},
                  {id: 'robai-arch-grub-2', type: 'latextooltip', content: '', metadata: {
                    displayMode: true,
                    parts: [
                      {expression: 'dof = ', blocks: [{id: 'dof', type: 'markdown', content: '\`dof\` stands for degrees of freedom, which represents the number of independent parameters that define the configuration of a robotic system.'}]},
                      {expression: 'm', blocks: [{id: 'm', type: 'markdown', content: '\`m\` is the number of degrees of freedom of the rigid body.\n\n- \`m = 3\` for planar rigid bodies.\n- \`m = 6\` for spatial rigid bodies.'}]},
                      {expression: '(N-1-J)', blocks: [{id: 'N', type: 'markdown', content: '\`N\` is the number of rigid bodies or links in the system. *Note, we consider the ground to be a rigid body here*\n\n\`J\` is the number of joints in the system.'}]},
                      {expression: '-', blocks: []},
                      {expression: '\\sum_{i=1}^{J} f_i', blocks: [{id: 'sum', type: 'markdown', content: 'Effectively a **for** loop where we *add the results together*.\nHere, we itterate over all **joints** in the system and sum together their \`f_i\`\'s.\n\n\`f_i\` is the number of degrees of freedom that joint \`i\` allows. For example, a revolute joint allows for 1 DoF, while a cylindrical joint allows for 2 DoFs.'}]},
                    ]
                  }},

                  {id: 'robai-arch-grub-3', type: 'dropdown', title: 'Grubler\'s Formula Example 1', content: '', children: [
                    {id: 'robai-arch-grub-3-1', type: 'image', content: 'robarch_dof_ex_1.png', metadata: { alt: 'A planar robotic system with 3 rigid bodies, 3 revolute joints, and 1 prismatic joint. Each joint has 1 DoF, so the system has a total of 1 DoF.', format: 'no-shadow', maxWidth: 'full'}},
                    {id: 'robai-arch-grub-3-2', type: 'markdown', content: 'Let\'s consider **why** this system has only 1 DoF. Say we put a motor at the bottom-left revolute joint. By moving this motor, all other joints move, including the sliding prismatic joint. This means that we can control the entire system by controlling just 1 joint, which is why the system has 1 DoF.\n\nIf we were to add another motor at the prismatic joint, trying to control both motors at the same time would cause one motor to break, since the prismatic joint might want to move a different direction than the revolute joint.'}
                  ]},

                  {id: 'robai-arch-grub-4', type: 'dropdown', title: 'Grubler\'s Formula Example 2', content: '', children: [
                    // {id: 'robai-arch-grub-4-1', type: 'image', content: 'robarch_dof_ex_2.png', metadata: { alt: 'A spatial robotic system with 4 rigid bodies, 4 revolute joints, and 1 cylindrical joint. The system has a total of 6 DoFs.', format: 'no-shadow', maxWidth: 'full'}},
                    {id: 'robai-arch-grub-4-2', type: 'markdown', content: '... I\'ll finish this later 😴 ... want to add the *delta robot* but if you can\'t wait, check out figure 2.8 in chapter 2 of Lynch and Park\'s book Modern Robotics ...'}
                  ]},

                  {id: 'robai-arch-cs-1', type: 'markdown', content: '# Configuration Space & Topology\n\n## Configuration Space\n\nThe configuration space, or C-space, is a mathematical representation of all possible configurations of a robotic system. Each point in the C-space corresponds to a unique configuration of the robot, defined by its joint parameters and positions. The C-space is crucial for motion planning, as it allows us to visualize and analyze the robot\'s movement and determine feasible paths from one configuration to another.'},

                  // {id: 'robai-arch-cs-2', type: 'plotly', title: '2D Planar configuration Space Example', content: 'robai_robarch_pointonplane.json', metadata: { height: 700, showModeBar: true } },
                ]
              },

              { id: 'robai-arch-intro-rbs',
                title: 'Mathematical Representations',
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
