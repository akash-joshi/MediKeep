import 'package:flutter/material.dart';
import 'home.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Center(
            child: Text('MediKeep'),
          ),
        ),
        body: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(
                  top: 10, bottom: 20, left: 15, right: 12),
              child: FlatButton(
                child: Text('Click Me'),
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => Home(
                                someText: "Japani",
                              )));
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
