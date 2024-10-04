#include <Arduino.h>

const int speakerPin = 2;

// スケールの名前と列挙体
const char* scaleNames[] = {
    "SCALE_G2",
    "SCALE_C3",
    "SCALE_C_SHARP3",
    "SCALE_D3",
    "SCALE_D_SHARP3",
    "SCALE_E3",
    "SCALE_F3",
    "SCALE_F_SHARP3",
    "SCALE_G3",
    "SCALE_G_SHARP3",
    "SCALE_A3",
    "SCALE_A_SHARP3",
    "SCALE_B3",
    "SCALE_C4",
    "SCALE_D4",
    "SCALE_NONE"  // 追加
};

enum Scale {
    SCALE_G2,
    SCALE_C3,
    SCALE_C_SHARP3,
    SCALE_D3,
    SCALE_D_SHARP3,
    SCALE_E3,
    SCALE_F3,
    SCALE_F_SHARP3,
    SCALE_G3,
    SCALE_G_SHARP3,
    SCALE_A3,
    SCALE_A_SHARP3,
    SCALE_B3,
    SCALE_C4,
    SCALE_D4,
    SCALE_NONE, // 追加
    SCALE_COUNT
};

const int frequencies[SCALE_COUNT] = {
    97.999, 130.813, 138.591, 146.832, 155.563, 164.814, 
    174.614, 185.000, 195.998, 207.652, 220.000, 
    233.082, 246.942, 261.626, 293.665,
    0 // SCALE_NONE の周波数は0に設定
};

void setup() {
    pinMode(speakerPin, OUTPUT);
    Serial.begin(9600);
}

void Sound(Scale scale, int length) {
    if (scale == SCALE_NONE) {
        delay(length); // 無音で指定された長さだけ待つ
        return; // 音を鳴らさない
    }
    int frequency = frequencies[scale];
    tone(speakerPin, frequency, length);
    delay(length + 50); // 音が鳴った後に少し待つ
}

void playPattern(const Scale* pattern, const int* lengths, int patternLength) {
    for (int i = 0; i < patternLength; i++) {
        Sound(pattern[i], lengths[i]);
        delay(5); // 各音の間に少しの間隔を置く
    }
}

void loop() {
    if (Serial.available()) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        // 鍵盤の音を再生
        int commaIndex = command.indexOf(',');
        if (commaIndex != -1) {
            String note = command.substring(0, commaIndex);
            int length = command.substring(commaIndex + 1).toInt();

            for (int i = 0; i < SCALE_COUNT; i++) {
                if (note == scaleNames[i]) {
                    Sound((Scale)i, length);
                    break;
                }
            }
        } else if (command == "pattern1") {
            const Scale pattern1[] = {
                SCALE_E3, SCALE_E3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_F3, SCALE_E3, SCALE_D3,
                SCALE_C3, SCALE_C3, SCALE_D3, SCALE_E3, SCALE_E3, SCALE_D3, SCALE_D3, SCALE_NONE,
                SCALE_E3, SCALE_E3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_F3, SCALE_E3, SCALE_D3,
                SCALE_C3, SCALE_C3, SCALE_D3, SCALE_E3, SCALE_D3, SCALE_C3, SCALE_C3, SCALE_NONE,
                SCALE_D3, SCALE_D3, SCALE_E3, SCALE_C3, SCALE_D3, SCALE_E3, SCALE_F3, SCALE_E3, SCALE_C3,
                SCALE_D3, SCALE_E3, SCALE_F3, SCALE_E3, SCALE_D3, SCALE_C3, SCALE_D3, SCALE_G2,
                SCALE_E3, SCALE_E3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_F3, SCALE_E3, SCALE_D3,
                SCALE_C3, SCALE_C3, SCALE_D3, SCALE_E3, SCALE_D3, SCALE_C3, SCALE_C3, SCALE_NONE,
            };
            const int lengths1[] = {
              350, 350, 350, 350, 350, 350, 350, 350,
              350, 350, 350, 350, 525, 175, 350, 350,
              350, 350, 350, 350, 350, 350, 350, 350,
              350, 350, 350, 350, 525, 175, 350, 350,
              350, 350, 350, 350, 350, 175, 175, 350, 350,
              350, 175, 175, 350, 350, 350, 350, 393.75,
              350, 350, 350, 350, 350, 350, 350, 350,
              350, 350, 350, 350, 525, 175, 350, 350,
              };
            playPattern(pattern1, lengths1, sizeof(pattern1) / sizeof(pattern1[0]));
        } else if (command == "pattern2") {
            const Scale pattern2[] = {
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE, // 7
                SCALE_A3, SCALE_C4, SCALE_D4, SCALE_G3, SCALE_F3, SCALE_A3, SCALE_NONE, // 7
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE, // 7
                SCALE_A3, SCALE_A_SHARP3, SCALE_A3, SCALE_G3, SCALE_F3, SCALE_F3, SCALE_NONE, // 7
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE, // 7
                SCALE_A3, SCALE_C4, SCALE_D4, SCALE_G3, SCALE_F3, SCALE_G3, SCALE_NONE, // 7
                SCALE_D3, SCALE_F3, SCALE_A_SHARP3, SCALE_A3, SCALE_G3, SCALE_F3, SCALE_G3, SCALE_A3, SCALE_E3, SCALE_C3, SCALE_D3, SCALE_NONE,
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE,
                SCALE_A3, SCALE_C4, SCALE_D4, SCALE_G3, SCALE_F3, SCALE_A3, SCALE_NONE,
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE,
                SCALE_A3, SCALE_A_SHARP3, SCALE_A3, SCALE_G3, SCALE_F3, SCALE_F3, SCALE_NONE,
                SCALE_D3, SCALE_F3, SCALE_G3, SCALE_G3, SCALE_A3, SCALE_A3, SCALE_NONE,
                SCALE_A3, SCALE_C4, SCALE_D4, SCALE_G3, SCALE_F3, SCALE_A3, SCALE_NONE,
                SCALE_D3, SCALE_F3, SCALE_A_SHARP3, SCALE_A3, SCALE_G3, SCALE_F3, SCALE_G3, SCALE_F3, SCALE_A3, SCALE_C4, SCALE_D4
            };
            const int lengths2[] = {
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33, 
              133.33, 133.33, 133.33, 133.33, 133.33, 133.33, 133.33,
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33,
              133.33, 133.33, 133.33, 133.33, 133.33, 133.33, 133.33,
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33,
              133.33, 133.33, 133.33, 133.33, 133.33, 133.33, 133.33,
              133.33, 133.33, 300, 300, 300, 300, 133.33, 133.33, 133.33, 133.33, 133.33, 166.67,
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33, 
              133.33, 133.33, 133.33, 133.33, 133.33, 133.33, 133.33,
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33,
              133.33, 133.33, 133.33, 133.33, 133.33, 266.67, 16.67,
              133.33, 133.33, 233.33, 233.33, 133.33, 266.67, 133.33,
              133.33, 133.33, 133.33, 133.33, 133.33, 133.33, 133.33,
              133.33, 133.33, 300, 300, 300, 300, 133.33, 133.33, 133.33, 133.33, 533.33
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 200, 200,
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 200, 200,
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 200, 200,
                  // 200, 200, 450, 450, 450, 450, 200, 200, 200, 200, 200, 250,
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 200, 200,
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 400, 25,
                  // 200, 200, 350, 350, 200, 400, 200,
                  // 200, 200, 200, 200, 200, 200, 200,
                  // 200, 200, 450, 450, 450, 450, 200, 200, 200, 200, 800
            };
            playPattern(pattern2, lengths2, sizeof(pattern2) / sizeof(pattern2[0]));
        } else if (command == "pattern3") {
            const Scale pattern3[] = {
                SCALE_C4, SCALE_B3, SCALE_A3
            };
            const int lengths3[] = {400, 600, 300};
            playPattern(pattern3, lengths3, sizeof(pattern3) / sizeof(pattern3[0]));
        }
    }
}
