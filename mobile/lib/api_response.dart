class ApiResponse {
  _Data data;

  ApiResponse({this.data});

  ApiResponse.fromJson(Map<String, dynamic> json) {
    data = json['data'] != null ? new _Data.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.data != null) {
      data['data'] = this.data.toJson();
    }
    return data;
  }
}

class _Data {
  String token;
  _User user;

  _Data({this.token, this.user});

  _Data.fromJson(Map<String, dynamic> json) {
    token = json['token'];
    user = json['user'] != null ? new _User.fromJson(json['user']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['token'] = this.token;
    if (this.user != null) {
      data['user'] = this.user.toJson();
    }
    return data;
  }
}

class _User {
  int id;
  String email;
  String password;
  String passwordSalt;

  _User({this.id, this.email, this.password, this.passwordSalt});

  _User.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    email = json['email'];
    password = json['password'];
    passwordSalt = json['passwordSalt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['email'] = this.email;
    data['password'] = this.password;
    data['passwordSalt'] = this.passwordSalt;
    return data;
  }
}