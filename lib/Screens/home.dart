import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  Home({@required this.someText});

  final String someText;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Welcome"),
        ),
        body: Row(
          children: <Widget>[
            FlatButton(
              child: Text("click me to go back"),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            Text(someText),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: Icon(
            Icons.add,
            size: 20,
            color: Colors.red,
          ),
          backgroundColor: Colors.blue,
        ),
      ),
    );
  }
}
