import flask
from flask import jsonify, Flask, request, Response, render_template, url_for, redirect
from flask_cors import CORS
import requests
import logging
import sqlite3
import json
import logging
import math

#import pdb; pdb.set_trace()

app = Flask(__name__)


app.config["DEBUG"] = False
CORS(app)

Wmin = 0
Imin = 0

# con = sqlite3.connect("belka-stalowa.db", check_same_thread=False);
# cur = con.cursor();

con_2 = sqlite3.connect("belka-stalowa_7.db", check_same_thread=False)
cur_2 = con_2.cursor()



# def addResult( con,result):
#   print('We are adding result:')
#   #try:
#   for res in result:
#     cur.execute(f'''INSERT INTO results (name,userName) VALUES
#                 ( "{res['name']}","{res['userName']}") ''')
#     con.commit()
    #except: print('bad case of adding a result')

# def addResultBeam( con_2,result):
#   print('We are adding result:')
#   #try:
#   for res in result:
#     cur_2.execute(f'''INSERT INTO resultsBeam (l_0,steelType,q,V,qk,M) VALUES ( "{res['l_0']}","{res['steelType']}", "{res['q']}", "{res['V']}", "{res['qk']}", "{res['M']}") ''')
#     con_2.commit()

# def showResults(con):
    # print('Here we have')
    # cur = con.cursor()
    # cur.execute("SELECT * FROM results")
    # records = cur.fetchall()
    # for row in records:
    #   print(row)
    # print('---')

def steelParams(data):
  fy = 0.0
  fu = 0.0
  Ee = 0.0
  qSolvi = 0.0
  Mbending = 0.0
  Wmin = 0.0
  Imin = 0.0

  match data['steelType']:
    case 'S235':
        fy = 235
        fu = 380
        Ee = 210000
    case 'S275':
        fy = 275
        fu = 430
        Ee = 210000
    case 'S335':
        fy = 335
        fu = 510
        Ee = 210000
    case _:
        print('Value of Steeltype not recognized')

  qSolvi = data['qk'] + data['q']
  Mbending  = 0.125 * pow(qSolvi,2)
  Wmin = (data['M'] * 10^6)/fy
  Imin = (5/384) * ((data['qk'] * pow(data['l_0'],3))/Ee)*data['n']
  print ('Wmin = ', Wmin, " Imin = ", Imin)
  return {"Wmin":Wmin, "Imin":Imin}


def showResultsBeam(con_2):
    print('Here we have')
    cur_2 = con_2.cursor()
    con_2.execute("SELECT * FROM resultsBeam")
    records = cur_2.fetchall()
    for row in records:
      print(row)
    print('---')

#l_0, steelType, q, V, qk, M, Wmin, Imin, Av, n, Ad, f_cdd, h,t
#l_0, steelType, q, V, qk, M, Wmin, Imin, Av, n, Ad, f_cdd, h,t
#try:
 # print('We are dropping the table results')
 # cur.execute("DROP TABLE results")
#except:
 # print('problem with droping table')
#CREATE TABLE IF NOT EXISTS
try :
  cur_2.execute("""CREATE TABLE resultsBeam(l_0 FLOAT, steelType TEXT, q FLOAT, V FLOAT, qk FLOAT, M FLOAT, Wmin FLOAT, Imin FLOAT, Av FLOAT, n FLOAT, Ad FLOAT, f_cdd FLOAT, h FLOAT,t FLOAT, Ved FLOAT)""")
  print('table was created')
except:
  pass

print('now this is the table')
logging.debug(showResultsBeam(con_2))




#showResults(con)
showResultsBeam(con_2)
#con.commit()
con_2.commit()


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

def calculateAfterWminCorrection():
  cur_2.execute('SELECT * FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row=cur_2.fetchall()
  print ("row =", row)
  cur_2.execute('SELECT q FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  q =  row[0]
  print('q=',q)
  cur_2.execute('SELECT qk FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  qk = row[0]
  print('qk=',qk)

  cur_2.execute('SELECT l_0 FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  l = row[0]
  #names = row.keys()
  #print('names ', names)

  print('qk ',qk)
  qdMax= q + qk
  print('qdMax ', qdMax)
  print('l=',l)
  Med= 0.125*qdMax*l**2
  Ved_value = 0.5*qdMax*l
  print('Ved before inserting to db =', Ved_value)
  try:
      cur_2.execute("SELECT ROWID FROM resultsBeam ORDER BY ROWID DESC LIMIT 1")
      row = cur_2.fetchone()
      print('row for updating Ved', row[0])
      cur_2.execute("UPDATE resultsBeam SET Ved = ?  WHERE ROWID = ?",(Ved_value,row[0]))
      con_2.commit()
  except sqlite3.Error as error:
      print(f"An error occurred: {error}")

  cur_2.execute('SELECT Ved FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  print('Ved direct after inserting = ', row[0])

  fy = 0.0
  cur_2.execute('SELECT steelType FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  stype = row[0]
  if "235" in stype:
    fy = 235
  elif "275" in stype:
    fy = 275
  elif "335" in stype:
    fy = 335
  print('fy = ',fy)
  cur_2.execute('SELECT Wmin FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  row = cur_2.fetchone()
  Wmin = row[0]
  print('wmin ',Wmin)
  Mrd= Wmin *fy
  if (Med/Mrd <= 1):
    print('okay')
    return 1
  else:
    print('not okay')
    return 0
  
def get_variable_name(var):
    for name, value in locals().items():
        if value is var:
            return name


  
def update_table(columns_to_update):
    print('Is now ')
    # Connect to SQLite database
    #try:
        # conn = sqlite3.connect(db_path)
        # cursor = conn.cursor()
    try:
        #cur_2.execute("SELECT ROWID FROM resultsBeam ORDER BY ROWID DESC LIMIT 1")
        
   
        # Construct and execute the UPDATE statement using ROWID
        print('here')
        print("Type of columns_to_update:", type(columns_to_update))
        print("Value of columns_to_update:", columns_to_update)
        set_clause = ', '.join([f"{column} = ?" for column in columns_to_update])
        update_query = f"""
        UPDATE resultsBeam
        SET {set_clause}
        WHERE ROWID = (
            SELECT ROWID FROM resultsBeam 
            ORDER BY ROWID DESC
            LIMIT 1
        );
        """
        cur_2.execute(update_query, list(columns_to_update.values()))

        # Commit the changes
        con_2.commit()
        print("Last row updated successfully.")

        
          
    except sqlite3.Error as error:
        print(f"An error occurred: {error}")

        # Execute the UPDATE statement
    

def insertToDB(val, valName):
    column_mapping = {
        'l_0': 'column1',
        'steelType': 'column2',
        'q': 'column3',
        'V': 'column4',
        'qk': 'column5',
        'M': 'column6',
        'Wmin': 'column7',
        'Imin': 'column8',
        'Av': 'column9',
        'n': 'column10',
        'Ad': 'column11',
        'fcdd': 'column12',
        'h': 'column13',
        't': 'column14',
        'Ved': 'column15'
    }

    if valName not in column_mapping:
        print(f"Invalid variable name: {valName} ", valName)
        return

    column_name = column_mapping[valName]
    print('The variable before inserting to db', valName, '=', val)

    try:
        cur_2.execute("SELECT ROWID FROM resultsBeam ORDER BY ROWID DESC LIMIT 1")
        row = cur_2.fetchone()
        print('row for updating', valName, '=', row[0])
        update_query = f"UPDATE resultsBeam SET {column_name} = ? WHERE ROWID = ?"
        cur_2.execute(update_query, (val, row[0]))
        con_2.commit()
    except sqlite3.Error as error:
        print(f"An error occurred: {error}")
    return
      



@app.route('/results', methods = ['GET'])
def results():
  print('getting results:')
  #print('all_results in route ',all_results)
  cur_2=con_2.cursor()
  cur_2.execute("SELECT * FROM resultsBeam")   #results - is a another db with name and userName
  all_results = cur_2.fetchall()
  #print('allresults in python get ', all_results)
  return all_results



@app.route("/update", methods = ['GET','POST'])
def add():
  data = request.json
  print('****************************************************************')
  print('-------------data on update/', data)
  #data = jsonify(data)
  #data = json.loads(request.data)
  if request.method == 'POST':

    # if data['name']:
    #   print('name ist anwesend,',data['name'])
    #   print('usermname data ',  data['userName'])
    #   cur=con.cursor()
    #   cur.execute('INSERT INTO results (name, userName) VALUES (?, ?)', (data['name'], data['userName']))
    #   con.commit()
    #   return data
    if data['steelType']:

      cur_2=con_2.cursor()
      steelParams(data)
      tupleTemp=steelParams(data)
      wmin = tupleTemp['Wmin']
      imin = tupleTemp['Imin']
      data["Wmin"] = wmin
      data["Imin"] = imin
      print("wmin,imin ",wmin,imin)
      #print(steelParams(data))
      
      cur_2.execute('INSERT INTO resultsBeam (l_0, steelType, q, V, qk, M, Wmin, Imin, Av, n, Ad, f_cdd, h,t, Ved ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', (data['l_0'], data['steelType'], data['q'], data['V'], data['qk'], data['M'], data['Wmin'], data['Imin'],0,0,0,0,0,0,0.2))
      con_2.commit()

      #execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password) )
      print('data in add() function  is =', data )
      return data

  else:
    return redirect(url_for("results", usr=data["l_0"]))

@app.route("/jeden")
def jeden():
	return f"<h1>Razu pewnego</h1>"

@app.route("/<usr>")
def user(usr):
	return f"<h1>{usr}</h1>"

@app.route('/calculateda_results', methods=['GET'])
def tupleA():
  lala = {"Wmin":1.0,"Imin":1.0,"qk":1.0}
  cur_2.execute('SELECT Wmin FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')#ORDER BY Wmin DESC LIMIT 1
  lala['Wmin']=cur_2.fetchone()
  print("lala Wmin = ", lala['Wmin'])
  cur_2.execute('SELECT Imin FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  lala['Imin']=cur_2.fetchone()
  cur_2.execute('SELECT qk FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
  lala['qk']=cur_2.fetchone()
  return lala
  #print("lala Imin = ", lala['Imin'])
  #headers = {'accept': 'application/json'}
  #toupleTMP=add()
  #print('toupleTMP = = = ', toupleTMP)
  #wmin = toupleTMP.Wmin
  #imin = toupleTMP.Imin
  #print("THERE ARE Wmin = ",wmin," Imin=", imin)
  #return f"<p>{lala['Wmin']}, {lala['Imin']}</p>" #toupleTMP

@app.route('/calculated_results', methods=['GET','POST'])
def submitTouple():
  data = request.json
  print('data in submitTouple function ', data)
  if request.method == 'POST':
    Wmin = data['Wmin']
    Imin = data['Imin']
    qk   = data['qk']
    cur_2.execute("""UPDATE resultsBeam SET Wmin = ?, Imin = ?, qk=? WHERE ROWID = (SELECT MAX(ROWID) FROM resultsBeam) """, (Wmin,Imin,qk))
    con_2.commit()
    print('now it ----')
    print('hello here submittouple data[wmin],data[imin],data[qk] ',data['Wmin'],data['Imin'],data['qk'])
    calculateAfterWminCorrection()
    print('data before return', data)
  return data

@app.route('/scinanie', methods=['GET','POST'])
def scinanie():
  data = request.json # data consists Av - not yet: n, Ad[m_2], f_cdd[kPa]


  if request.method == 'POST':
    if 'Av' not in data:
        return jsonify({'error': 'Missing Av value'}), 400
      
    cur_2.execute('SELECT qk FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    qk = baseRow[0]

    cur_2.execute('SELECT l_0 FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    l = baseRow[0]

    cur_2.execute('SELECT Imin FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    Imin = baseRow[0]

    cur_2.execute('SELECT Ved FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    print('baserow for Ved', baseRow)
    Ved = baseRow[0]
    print ('ved getted from DB - ',Ved)
    cur_2.execute('SELECT steelType FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    stype = baseRow[0]

    if stype == 'S235':
      fy = 235
      fu = 380
    elif stype == 'S275':
      fy = 275
      fu = 430
    elif stype == 'S335':
      fy = 335
      fu = 510
    print ('fu=',fu)
    print('data[Av]=', data['Av'])
    Vrd = data['Av']*(fy/math.sqrt(3))
    if Ved / Vrd < 1:
      print('okay')
    
    #Do not forget to add Av, n, Ad[m_2], f_cdd[kPa] to database!!!
    #return {'Av':data['Av']}
    if data['Av']:
      Av = data['Av']
      print('av is correctly passed before call for inserting to db')
      
      update_table({'Av':Av})
    else: print('No ',get_variable_name(Av), ' so inserting in the db not successed' ) 
    
    #Adding f_cdd to database
    if data['f_cdd']:
      fcdd = data['f_cdd']
      print('av is correctly passed before call for inserting to db')
      f_cdd=fcdd
      update_table({'f_cdd':fcdd})
    else: print('No ',get_variable_name(f_cdd), ' so inserting in the db not successed' )
      
    
   
    
    
    
    # if data['Ad']:
    #   Ad = data['Ad']
    #   print('Ad = data[Ad] ', Ad )
    #   varName = get_variable_name(Ad)
    #   print('Ad, Adname ' , varName, ' ', Ad )
    #   insertToDB(Av, varName)
    # else: print('No ',get_variable_name(data['Ad']),' , so inserting in the db not successed' )    
  
    # if data['n']:
    #   n = data[n]
    #   varName = get_variable_name(n)
    #   insertToDB(n, varName)
    # else: print('No ',get_variable_name(data['n']),' , so inserting in the db not successed' )  
    
    # if data['f_cdd']:
    #   f_cdd = get_variable_name(f_cdd)
    #   insertToDB(f_cdd, varName)
    # else: print('No ',get_variable_name(data['f_cdd']),' , so inserting in the db not successed' ) 
    
    return "0"
  if request.method == 'GET':
    return "0"

@app.route('/usability', methods=['GET','POST'])
def uzytkowalnosc():
  data =request.json
  if request.method == 'POST':
    #sprawdzanie warunku stanu granicznego użytkowalności
    E = 210000
    cur_2.execute('SELECT q FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    qd = baseRow[0]

    cur_2.execute('SELECT l_0 FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    l = baseRow[0]

    cur_2.execute('SELECT Imin FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    Imin = baseRow[0]
    
    
    
    if data['n']:
      n = data['n']
      print('ad is correctly passed before call for inserting to db')
      update_table({'n':n})
    else: print('No ',get_variable_name(n),' , so inserting in the db not successed' )  
    qd= qd*0.8
    w = (5/384)*(qd*l**4)/(E*Imin)
    w_lim= l/data['n']
    if w < w_lim:
      print ('okay')

    return {}

def checkKey(dic, key):
    if key in dic.keys():
        print("Present, ", end =" ")
        print("value =", dic[key])
        return 1
    else:
        print('there is no ', key, ' in  ', dic)
        return 0

@app.route ('/support', methods=['GET','POST'])
def oparcie():
  if request.method == 'POST':
    data = request.json

    fy = 0.0
    cur_2.execute('SELECT steelType FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    row = cur_2.fetchone()
    stype = row[0]
  
    if "235" in stype:
      fy = 235
    elif "275" in stype:
      fy = 275
    elif "335" in stype:
      fy = 335
    print('if fy is 0 then is an incorrect value , here fy = ',fy)

    #oparcie belki na wieńcu żelbetowym ściany
    cur_2.execute('SELECT Ved FROM resultsBeam ORDER BY ROWID DESC LIMIT 1')
    baseRow=cur_2.fetchone()
    Ved = baseRow[0]
    print('Ved in support = ', Ved)
    print('data ',data)
    
    if data['Ad']:
      Ad = data['Ad']
      print('ad is correctly passed before call for inserting to db')
      update_table({'Ad':Ad})
    else: print('No ',get_variable_name(Ad), ' so inserting in the db not successed' )  
    
    if data['fcdd']:
      print('fcdd here is', data )
      fcdd = data['fcdd']
      print('fcdd before updata_table is ',fcdd)
      update_table({'fcdd':fcdd})
    else: print('No ',get_variable_name(fcdd),' , so inserting in the db not successed' ) 
    
    if checkKey(data,'Ad') and checkKey(data,'fcdd'):
      print('Ad and fcdd ', data['Ad'],'- ',data['fcdd'])
      Vrdd = data['Ad']*data['fcdd']
      if Ved/Vrdd < 1:
        print(' ved/vrdd okay',Vrdd)
      else: print(' ved/vrdd not okay')
      Epsilon = math.sqrt(215/fy)
      print('Epsilon = ',Epsilon)
      
      return {}
    return {}
  if request.method == 'GET':
    print('it was get occidentialy')
    return {}
  
@app.route ('/intersection', methods=['GET','POST'])
def intersect():
  message ={"correct":"Ścianka profilu jest odporna na miejscową utratę stateczności",
            "incorrect":"Ścianka profilu nie jest odporna na miejscową utratę stateczności"
  }
  if request.method == 'POST':
    data = request.json
    
    if data['h']:
      h = data['h']
      print('ad is correctly passed before call for inserting to db')
      update_table({'h':h})
    else: print('No ',get_variable_name(h), ' so inserting in the db not successed' )  
    
    if data['t']:
      t = data['t']
      update_table({'t': t})
    else: print('No ',get_variable_name(t),' , so inserting in the db not successed' ) 
    
    Epsilon = 1 #temporary - change this in production mode!
    response_message = message['correct'] if data['h']/data['t'] <= 70*Epsilon else message['incorrect']
    return jsonify({"message": response_message})
    
   
@app.route('/detail/<id>', methods=['GET'])
def detail(id):

    for x in all_results:
      if int(x['id']) == int(id):
        return jsonify(x)

    return "Record not found", 400

#print(all_results)
showResultsBeam(con_2)
app.run(host='0.0.0.0', port=5000)
