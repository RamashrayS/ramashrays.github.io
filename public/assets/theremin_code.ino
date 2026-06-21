const int sensorPin = A0;      // LDR input
const int speakerPin = 4;      // Buzzer output

const long maxPitch = 2500;    // Maximum frequency

int sensorValue = 0;
long outputPitch = 0;

void setup() {
    pinMode(speakerPin, OUTPUT);
}

void loop() {

    // Read light level from LDR
    sensorValue = analogRead(sensorPin);

    // Convert sensor reading to frequency
    outputPitch = ((long)sensorValue * maxPitch) / 1023;

    // Calibration offset for better response
    outputPitch += 50;

    // Prevent invalid frequencies
    if (outputPitch > maxPitch) {
        outputPitch = maxPitch;
    }

    playTone(speakerPin, outputPitch, 10);
}

void playTone(int pin, long freq, long duration) {

    long halfCycle = 1000000L / freq / 2;
    long totalCycles = (freq * duration) / 1000;

    for (long i = 0; i < totalCycles; i++) {

        digitalWrite(pin, HIGH);
        delayMicroseconds(halfCycle);

        digitalWrite(pin, LOW);
        delayMicroseconds(halfCycle);
    }
}