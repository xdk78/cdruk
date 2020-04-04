import 'dart:convert';

import 'package:cdruk/api_response.dart';
import 'package:http/http.dart' as http;

class _Api {
  final baseUrl = 'http://192.168.1.220:4000';

  Future<dynamic> login(String email, String password) async {
    var res = await http.post(
      baseUrl + '/login',
      body: {'email': email, 'password': password} 
    );
    print(res.body);
    var resp = json.decode(res.body);
    if (resp['error'] == null) return res.body;
    else return resp;
  }

  Future<dynamic> register(String name,String email, String password) async {
    var res = await http.post(
      baseUrl + '/register',
      body: {'name': name, 'email': email, 'password': password} 
    );
    print(res.body);
    var resp = json.decode(res.body);
    if (resp['error'] == null) return ApiResponse.fromJson(resp);
    else return resp;
  }
}

var api = _Api();