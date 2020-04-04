import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ModelsScreen extends StatefulWidget {
  ModelsScreen({Key key}) : super(key: key);

  @override
  _ModelsScreenState createState() => _ModelsScreenState();
}

class _ModelsScreenState extends State<ModelsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("3D Models"),
      ),
      body: Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              InkWell(
                child: Text('Przyłbica prusy'),
                onTap: () => launch('https://www.prusaprinters.org/prints/25857-prusa-face-shield'),
              )
            ]),
      ),
    );
  }
}
