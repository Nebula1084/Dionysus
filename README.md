# Build
The build of the project is quite tricky. The original intention
is to build the client into a static bundle and compile it
into the static file directory of server jar package. But the 
client project couldn't be bundled since the Deck GL dependency.
You can try to configure the project to make the artifact built and
modify the build.gradle under server project. Let the server copy 
the artifact into the jar package.

Now, we just compile the server. First you need to down and copy following files into the directory `server/src/main/resources/`.
You can find the data from this link [yelp-dataset](https://www.kaggle.com/yelp-dataset/yelp-dataset/data).
~~~
yelp_business_attributes.csv
yelp_business.csv
yelp_business_hours.csv
yelp_checkin.csv
~~~
Now, following command to build the server.
~~~
./gradlew server:build
~~~
The server's artifact is under directory `server/build/libs`.

# Deploy
First, start the back-end server.
~~~
java -jar server/build/libs/dionysus-server-1.0.0.jar
~~~
The server will listen at port 8080.
Then, change directory into the client. And start development server.
~~~
cd client/
npm start
~~~
The development server will listen at port 8000.

You may have noticed that, the request from client to the back-end server
will cross domain. So, I configured the HTTP API to allow the cross-origin.
