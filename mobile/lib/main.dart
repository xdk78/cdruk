import 'package:cdruk/login_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CDRUK',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("CDRUK"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
          Text("CDRUK"),
          Text(
            "aka KORONA W DRUKU",
            style: TextStyle(fontSize: 12.0))
        ],)
      ),
      drawer: Drawer(
        child: ListView(
          children: ListTile.divideTiles( //          <-- ListTile.divideTiles
              context: context,
              tiles: [
                DrawerHeader(
                  child: Text('CDRUK'),
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(179, 179, 179, 0.4),
                  ),
                ),
                ListTile(
                  title: Text('Log in'),
                  onTap: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                  },
                ),
                ListTile(
                  title: Text('Sign up'),
                )
              ]
          ).toList(),
        )
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => {},
        tooltip: 'Add',
        child: Icon(Icons.create),
      ),
    );
  }
}
