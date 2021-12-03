import pandas as pd
#convert csv to line protocol;

#convert sample data to line protocol (with nanosecond precision)
df = pd.read_csv("Donnees de vol_20210922.csv")
lines = ["flightdata"
         + ",flightnum=4"
         + " "
		 + "State=" + str(df["State"][d]) + ","
         + "Altitude=" + str(df["Altitude"][d]) + ","
         + "Pitch=" + str(df["Pitch"][d]) + ","
         + "Roll=" + str(df["Roll"][d]) + ","
         + "Pitch_Correct=" + str(df["Pitch_Correct"][d]) + ","
         + "Roll_Correct=" + str(df["Roll_Correct"][d]) + ","
		 + "Parachute=" + str(df["Parachute"][d]) + ","
		 + "Abort=" + str(df["Abort"][d]) + ","
		 + "Voltage=" + str(df["Voltage"][d]) + ","
                 + "Temperature=" + str(df["Temperature"][d]) + ","
		 + "Gforce=" + str(df["Gforce"][d])
         + "  " + str(df["Epoch"][d])+"000000" for d in range(len(df))]
thefile = open('chronograf.txt', 'w')
for item in lines:
    thefile.write("%s\n" % item)
