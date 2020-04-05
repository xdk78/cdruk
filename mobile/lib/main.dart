
import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

import 'signup_screen.dart';
import 'models_screen.dart';
import 'contact_screen.dart';
import 'package:cdruk/login_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CDRUK',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        //visualDensity: VisualDensity.adaptivePlatformDensity, psuje sie tutaj więc wywaliłem
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  SharedPreferences preferences;

  Future<SharedPreferences> loadPreferences() async {
    var sr = await SharedPreferences.getInstance();
    return sr;
  }

  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then((value) => preferences = value).then((value) => build(context));
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: loadPreferences(),
      builder: (context, snapshot) {
        if (snapshot.hasError) return Text("$snapshot.error");
        if (snapshot.hasData) {
          return Scaffold(
            appBar: AppBar(
              title: Text("CDRUK"),
            ),
            body: Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                RichText(
                  text: TextSpan(
                      text:
                          'Lekarzom w całej polsce brakuje sprzętu, Jest im teraz potrzebna pomoc, aby mogli pomagać nam\n',
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.black87,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                            text:
                                '\nMasz drukarkę 3D i chcesz pomóc służbie zdrowia?',
                            style: TextStyle()),
                        TextSpan(
                            text: '\nZarejestruj się!\n',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => SignupScreen()));
                              }),
                        TextSpan(text: '\nW twoim szpitalu brakuje sprzętu?'),
                        TextSpan(
                            text: '\nZgłoś się do nas!',
                            recognizer: TapGestureRecognizer()
                              ..onTap = () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => ContactScreen()));
                              })
                      ]),
                )
              ],
            )),
            drawer: Drawer(
                child: ListView(
              children: ListTile.divideTiles(
                  //          <-- ListTile.divideTiles
                  context: context,
                  tiles: [
                    DrawerHeader(
                      child: Text('CDRUK'),
                      decoration: BoxDecoration(
                        color: Color.fromRGBO(179, 179, 179, 0.4),
                      ),
                    ),
                    Visibility(
                      visible: preferences.getString("token") == null,
                      child: ListTile(
                        title: Text('Log in'),
                        onTap: () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) => LoginScreen()));
                        },
                      ),
                    ),
                    Visibility(
                      visible: preferences.getString("token") == null,
                      child: ListTile(
                        title: Text('Sign up'),
                        onTap: () {
                          Navigator.push(context,
                              MaterialPageRoute(builder: (context) => SignupScreen()));
                        },
                      ),
                    ),
                    ListTile(
                      title: Text('3D Models'),
                      onTap: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) => ModelsScreen()));
                      },
                    ),
                    ListTile(
                      title: Text('Contact'),
                      onTap: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) => ContactScreen()));
                      },
                    ),
                    Visibility(
                      visible: preferences.getString("token") != null,
                      child: ListTile(
                        title: Text("ddd"),
                        onTap: () {
                          setState(() {
                            preferences.remove("token");
                          });
                        },
                      ),
                    )
                  ]).toList(),
            )),
          );
        }
        return CircularProgressIndicator();
      },
    );
  }
}
