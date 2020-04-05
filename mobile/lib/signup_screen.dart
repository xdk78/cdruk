import 'dart:convert';

import 'package:cdruk/api.dart';
import 'package:cdruk/main.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignupScreen extends StatefulWidget {
  SignupScreen({Key key}) : super(key: key);

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController _nameController = new TextEditingController();
  final TextEditingController _emailController = new TextEditingController();
  final TextEditingController _passwordController = new TextEditingController();

  var _error;
  var _done;

  SharedPreferences preferences;

  void loadPreferences() async {
    preferences = await SharedPreferences.getInstance();
  }

  @override
  void initState() {
    super.initState();
    _error = "";
    _done = "";
    loadPreferences();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sign Up"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(16.0),
              child: TextField(
                controller: _nameController,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                    labelText: "Name", border: OutlineInputBorder()),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(16.0),
              child: TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                    labelText: "E-mail", border: OutlineInputBorder()),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(16.0),
              child: TextField(
                controller: _passwordController,
                keyboardType: TextInputType.text,
                obscureText: true,
                decoration: InputDecoration(labelText: "Password", border: OutlineInputBorder()),
              ),
            ),
            Text(
              _error,
              style: TextStyle(color: Colors.redAccent),
            ),
            Text(
              _done,
              style: TextStyle(color: Colors.lightGreenAccent),
            ),
            RaisedButton(
              child: Text("Sign Up"),
              onPressed: () {
                api
                    .register(_nameController.text, _emailController.text,
                        _passwordController.text)
                    .then((value) {
                  if (value.runtimeType == String) {
                    setState(() {
                      _done = "Registered successfully";
                      _error = "";
                    });
                    preferences.setString(
                      "token", json.decode(value)['data']['token']);
                    Navigator.pushReplacement(context,
                      MaterialPageRoute(builder: (BuildContext ctx) => MyHomePage()));
                  } else {
                    setState(() {
                      _error = value['error'];
                    });
                  }
                });
              },
              color: Colors.green,
            )
          ],
        ),
      ),
    );
  }
}
