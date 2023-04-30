import flask
from flask import jsonify, Flask, request, render_template, url_for, redirect
from flask_cors import CORS
import requests
import logging
import sqlite3
import json
import logging
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)



con = sqlite3.connect("belka-stalowa.db", check_same_thread=False)
cur = con.cursor()



def addResult( con,result):
  print('We are adding result:')
  #try:
  for res in result:
    cur.execute(f'''INSERT INTO results (name,userName) VALUES
                ( "{res['name']}","{res['userName']}") ''')
    con.commit()
    #except: print('bad case of adding a result')

def showResults(con):
    print('Here we have')
    cur = con.cursor()
    cur.execute("SELECT * FROM results")
    records = cur.fetchall()
    for row in records:
      print(row)
    print('---')

#try:
 # print('We are dropping the table results')
 # cur.execute("DROP TABLE results")
#except:
 # print('problem with droping table')

try :
  cur.execute("""CREATE TABLE IF NOT EXISTS results(name TEXT, userName TEXT)""")
  print('table created')
except:
  pass

print('now this is the table')
print(showResults(con))

all_results = [ {

               "name": "avs",
               "userName": "bobo"
               },
               {
                 "name": "bvs",
                 "userName": "tobo"
               },
               {
                 "name": "Kololo",
                 "userName": "Bonobo"
               }
]

#result['name'] = "pies"
#result['userName'] = "kot"
#addResult(con,all_results)
#cur.execute("INSERT INTO results VALUES('pies','kot')")
showResults(con)
#addResult(con,result)
showResults(con)
con.commit()


all_results = [ {

               "name": "avs",
               "userName": "bobo"
               },
               {
                 "name": "bvs",
                 "userName": "tobo"
               },
               {
                 "name": "Kololo",
                 "userName": "Bonobo"
               }
]

@app.route('/results', methods = ['GET'])
def results():
  print('getting results:')
  #print('all_results in route ',all_results)
  cur=con.cursor()
  cur.execute("SELECT * FROM results")
  all_results = cur.fetchall()
  print('allresults in python get ', all_results)
  return all_results


@app.route("/update", methods = ['GET','POST'])
def add():
  data = request.json
  #data = jsonify(data)
  #data = json.loads(request.data)
  if request.method == 'POST':

    print('name,',data['name'])
    print('usermname data ',  data['userName'])
    #print ('json,',data["name"])
    #print ('json userName,',data["userName"])
    cur=con.cursor()
    cur.execute('INSERT INTO results (name, userName) VALUES (?, ?)',
                      (data['name'], data['userName']))
    con.commit()
    return data
  else:
    return redirect(url_for("result", usr=data["name"]))


@app.route("/<usr>")
def user(usr):
	return f"<h1>{usr}</h1>"



@app.route('/detail/<id>', methods=['GET'])
def detail(id):

    for x in all_results:
      if int(x['id']) == int(id):
        return jsonify(x)

    return "Record not found", 400

#print(all_results)
print('----')

showResults(con)
app.run()
