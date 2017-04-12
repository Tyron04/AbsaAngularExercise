# AbsaAngularExercise

The Front-End was created using Angular 2 and styled using Bootstrap
    - The front end is dockerized and can be built using "docker build -t absa-angular ." while in the "/public" folder
    - Use "docker run -d --name absa-angular -p 3000:3000 absa-angular" to run the container
    - You can now browse to "http://localhost:3000" to view the site

The Database is Mongo DB
    - The database is dockerized and can be run using "docker run -d --name mongodb -p 27017:27017 mongo"


The Server was created using .Net WebApi and requires IIS to run
    - The server is dockerized and can be built using "docker build -t absa-server ." while in the "/server" folder
    - Use "docker run --name server -d -p 57022:57022 absa-server" to run the container
    - User "docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" absa-server" to get the public IP
    - The server will be available on "http://{public-IP}:57022" 
    - Eventhough the server is hosted I was unable to find a way to link the MongoDB container to this container for          communication and hence the REST Api's will not function.
    - If hosting locally:
                - Create a new website in IIS with physical path pointing to the folder "/server/AbsaAngularExercise/AbsaAngularExercise"
                - Use port 57022 as the binding
                - Run a POST method on "http://localhost:57022/api/countries/create" to insert default countries
                - Run a POST method on "http://localhost:57022/api/auth/create" to insert a default user for Login
    
    
Once everything is setup you can browse to the front-end and start using the system
Login credentials are Username: "Admin" Password: "Admin"






