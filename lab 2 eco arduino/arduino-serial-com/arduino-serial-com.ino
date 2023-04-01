const int SENSOR = A3;
const int LEDA= 6;
const int LEDB= 5;

int Svalue;
int Avalue;
int Bvalue;

void setup() {
  pinMode(SENSOR, INPUT);
  pinMode(LEDA, OUTPUT);
  pinMode(LEDB, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  if (Serial.available() > 0) {
    receivingData();
  } else {
    sendingData();
  }
  delay(10);
}

void sendingData() {

  Svalue=analogRead(SENSOR);
  Avalue=digitalRead(LEDA);
  Bvalue=digitalRead(LEDB);

  Serial.print(Svalue);
  Serial.print(' ');
  Serial.print(Avalue);
  Serial.print(' ');
  Serial.print(Bvalue);
  Serial.println();
  delay(1000);
}

void receivingData() {

  char inByte = Serial.read();

  switch (inByte) {
    case 'P':
      digitalWrite(LEDA, HIGH);
      break;
    case 'A':
      digitalWrite(LEDA, LOW);
      break;
    case 'E':
      digitalWrite(LEDB, HIGH);
      break;
    case 'O':
      digitalWrite(LEDB, LOW);
      break;
  }
  Serial.flush();
}