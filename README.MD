As I approached my senior year for my B.S. in Electrical Engineering, I wanted to create something that most people hadn't created before, a circuit simulator! It was about the experience, the learning, and the the journey itself. I put together this application to package my knowledge in Electrical Engineering to some day help another student have an easier time in their scholastic pursuits and in turn teach them about circuits. Circuit Solver is far from perfect and there are lots of things that could be optimized. It will however, simulate a majority of linear Circuits and a decent amount of smaller scale Non-Linear Circuits. If this app helps you in any way, i'd appreciate you spreading the word to help support my efforts Thanks!

Think of Circuit Solver as an electronic circuit board, you drag your electrical components and place them on one at a time. You hook up some sources and you place some meters to read the values. If you need to analyze the waveform, grab some electrical leads and view them with an oscilloscope. There are many SPICE tools out there for PC such as Multisim, LTSpice, and PSpice. Circuit Solver doesn't compare to their raw power but it is optimized to run on mobile devices which makes it both portable and easily accessible to anyone in need of circuit solutions. Circuit Solver strives to verify Ohm's law, Kirchhoff's current and voltage laws by creating models that are both stable and efficient.

DC Simulation: To solve the circuits, a matrix is defined based on all the components inside the circuit. The application solves the circuit using matrix manipulations such as LU-Decomposition and matrix inversion. DC Analysis is completed by writing a series of nodal equations. The equations are solved simultaneously to obtain a unique solution.

Transient Simulation: In transient simulation we use numerical integration to determine the response of RLC circuits. Numerical integration allows for one to solve for discrete moments of time and in effect integrate their response. This application only supports the Backward Euler Method.

Non Linear Simulation: Non linear analysis is used for components such as diodes and LEDs. The solver first guesses the approximate value of the solution and is refined through the use of a Newton-Raphson process. It utilizes linear approximation to predict the answer through successive iterations.

Built-in-Oscilloscope: Visualize waveforms through the use of the built in oscilloscope. To use this feature simply link either a volt meter or an amp meter to the graph by tapping on them and pressing the eye, in order to view the wave.

Saving Schematics/Circuits: Save your circuits on your device to use anywhere you go and at any time. You may also capture screen shots of the circuits you build. These screen shots are saved locally on your device.

List of Components:
+ Absolute Value
+ AC Current
+ AC Source
+ ADC Module
+ Adder
+ Am Meter
+ AND Gate
+ Capacitor
+ Constant
+ Current Controlled Current Source
+ Current Controlled Voltage Source
+ DAC Module
+ DC Current
+ DC Source
+ D Flip Flop
+ Differentiator Module
+ Diode
+ Divider
+ Fuse
+ Gain Block
+ Greater Than
+ Ground
+ High Pass Filter
+ Inductor
+ Integrator Module
+ Light Emitting Diode
+ Look Up Table
+ Low Pass Filter
+ Multiplier
+ NAND Gate
+ N Channel MOSFET
+ Net
+ NOR Gate
+ Note
+ NOT Gate
+ NPN Bipolar Junction Transistor
+ Ohm Meter
+ Operational Amplifier
+ OR Gate
+ P Channel MOSFET
+ PID Module
+ PNP Bipolar Junction Transistor
+ Potentiometer
+ Pulse Width Modulator
+ Rail
+ Relay
+ Resistor
+ Sample And Hold
+ Saw Wave
+ Single Pole Double Throw
+ Single Pole Single Throw
+ Square Wave
+ Subtractor
+ TPTZ Module
+ Transformer
+ Triangle Wave
+ Voltage Controlled Capacitor
+ Voltage Controlled Current Source
+ Voltage Controlled Inductor
+ Voltage Controlled Resistor
+ Voltage Controlled Switch
+ Voltage Controlled Voltage Source
+ Voltage Saturation
+ Volt Meter
+ Watt Meter
+ Wire
+ XNOR Gate
+ XOR Gate
+ Zener Diode 