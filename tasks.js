
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

var tasks = [{ id:1 , check:"false" , checkbox:"[ ]" , task: "buy batata"},
             { id:2 , check:"false" , checkbox:"[ ]" , task: "do the exercises"}];


/**
 * shows tasks
 *
 * @returns {tasks}
 */
 function list(){
  for ( var i = 0 ; i < tasks.length ; i++ ){
    console.log(tasks[i].id + ' - ' + tasks[i].checkbox + ' ' + tasks[i].task);
  }
}
/**
 * shows help
 * shows all commands
 *
 * @returns {void}
 */
 function help(){
  console.log('--------------------------------------------------------');
  console.log('hello          -> prints hello');
  console.log('hello + name   -> prints hello name');
  console.log('list           -> shows all tasks');
  console.log('help           -> shows all commands');
  console.log('quit           -> quits file');
  console.log('exit           -> exits file');
  console.log('--------------------------------------------------------');
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  //console.log(text);
  let name = text.substr(5);
  if (text.split(" ",1) == 'hello'){
    greeting(name);
  }
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello + name
 *
 * @returns {hello + name}
 */
function greeting(name){
  name = name.trim();
  console.log('Hello '+name+'!');
}
/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Abbass Kaouk")
