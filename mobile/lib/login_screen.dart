import 'dart:convert';

import 'package:cdruk/api.dart';
import 'package:cdruk/main.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({Key key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = new TextEditingController();
  final TextEditingController _passwordController = new TextEditingController();

  var _error;

  SharedPreferences preferences;

  void loadPreferences() async {
    preferences = await SharedPreferences.getInstance();
  }

  @override
  void initState() {
    super.initState();
    loadPreferences();
    _error = "";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Log in"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
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
                decoration: InputDecoration(
                    labelText: "Password", border: OutlineInputBorder()),
              ),
            ),
            Text(
              _error,
              style: TextStyle(color: Colors.redAccent),
            ),
            RaisedButton(
              child: Text("Login"),
              onPressed: () {
                api
                    .login(_emailController.text, _passwordController.text)
                    .then((value) {
                  if (value.runtimeType == String) {
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
