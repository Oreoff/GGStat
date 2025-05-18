# To launch this project you need:
1) Bought copy of Starcraft:Remastered
2) Docker Desktop
3) Developing enviroment, such as VS Code or Visual Studio
# How to launch this project:
1) Clone this repository and https://github.com/Oreoff/GGStat-Backend in diffrent folders
2) Write "npm i" in terminal this project.
3) Launch backend project by writing "docker-compose up" in backend folder. 
4) Launch this project by writing "npm run start" in terminal. 
# How to parse new data:
1) Clone https://github.com/Oreoff/GGStat-Backend 
2) Open Starcraft:Remastered on your computer.
3) Opne Fiddler, and check port, by what your computer is connected with SC:R.
4) Change a Port value in Settings.cs file.
5) Launch project.
6) Do POST-request.
# Or u can launch GGStatParsingDataService in backend