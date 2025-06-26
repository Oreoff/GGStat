# To launch this project you need:
1) Bought copy of Starcraft:Remastered
2) Docker Desktop
3) Developing enviroment, such as VS Code or Visual Studio
4) Downloaded Node.js 
# How to launch this project:
1) Clone this repository and https://github.com/Oreoff/GGStat-Backend in diffrent folders
2) Write "npm i" in terminal this project.
3) Launch backend project by writing "docker-compose up" in backend folder. 
4) Launch this project by writing "npm run start" in terminal. 
# How to parse new data:
1) Launch Starcraft:Remastered.
2) Launch GGStatParsingDataService.
# Replays are working now only with launching without Docker.
# To launch without Docker, you need to:
1) Change host in connectionString from "postgres_db" to "localhost" in all appsettings.json files. You need to change password that used in local PostgreSQL host.
2) Change file location in ImporterService, as it works in GGStatParsingDataService.
3) Change host in playersFetch from http://localhost:5000/api/players to http://localhost:5120/api/players .'
4) Launch GGStatWebApi.