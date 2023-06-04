# Seinira: The Khadran Colosseum

This Project is the Functioning Framework for a classic JRPG style game, modled after Final Fantasy and Dragon Quest, and was made as my Solo Full Stack Capstone project for my React.js Web Development program.

## Technical Summary:

This full-Stack S.P.A was made using React.js, using React router DOM for navigation, and a combination of CSS3 and Tailwind CSS for styling, it is backed by a REST API that is accessed using AXIOS for the HTTPS requests, Express.js for the routing, and CORS to handle complex resource sharing, Sequelize is used to structure user data, I.E Username, password, and Character Data in the back-end so it can be saved to an external PostgreSQL database for use when loging in or loading a save file.

## Terms of Use/Service:
I will keep this brief, You are aknowledging that all of the code present belongs to myself, and under no circumstances are you to claim it as your own in anyway. All graphics present are used under Official Liscenses both free and purchased. ***You are NOT allowed to copy, rip, redistribute, or edit any part of these graphics or code.*** Links to where you may get legal access to the Graphics and images used can be found both on the Credits page of the application, and the bottom of this README under the CREDITS Heading.

# Technologies Used:

## This project was Created using the following technologies:


### For the Front-End, and styling:

<img alt='React.js' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" /> 
<img alt='CSS3' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" />
<img alt='Tailwind Css' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />  


### Back-End Server and Server Functionality Constructed with:

<img alt='Node.js' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg"  />
<img alt='JavaScript' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" /> 



#### Including: Axios, Express.js and CORS for handling API requests. JSON Web Token for Authentication of logins, and finally BCrypt.JS for password Hashing

### Login, and Save Data managed with:

<img alt='Sequelize'  width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original-wordmark.svg" />     
<img alt='Postgres SQL'  width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" /> 

#### Database hosted on Bit.Io

### Graphical editing done using:
<img alt='Adobe Photoshop' width='100' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg" />

## In Depth Feature Walkthrough:

In this section I will go through and give an exhaustive account of everything in this game.

### Descriptions of Individual Views:



#### The Title Screen:

> The Title screen is modled after older games where all your options were avaliable once the screen loaded. The Buttons present each route to a different view. From this view you can Press "Start Game" to be taken to the Game Start View, Press the "About" Button to be taken to a view which will give you a brief rundown of the App I.E Technologies used, current features, and planned features, Press the "Credits" Button to be taken to a view displaying all of the Name and Links for my Graphics and images, in accordance with the T.O.U for those images, or Press the "Sign Up/Login" button to be taken to the Authentication View where you can register a new user, or log in as an existing user
>
>The background image consits of several images I modified, and layered over each other in photoshop.

#### The About Screen:

> On the About Screen you will be greeted with a Technologies used heading which will be almost like what is here in this README. Every Technology I used and could find an Icon for is displayed, with a bit of text at the end to list the technologies I couldn't find an Icon for. Under that is a statement that this game is, of course a W.I.P. Under that is a list of Current Features which is a summary of what you are reading now, a list of planned features that I am looking to code out and implement in time, and finally a generic warning that the order in which planned features are listed IS NOT the order they will be worked on. Once you have skimmed over this there is a button at the very bottom that will return you to the Title Screen.

#### The Credits Screen:

> On this screen is a list of Links, and a couple warnings. The first of which is a very loud looking bit of text telling The user not to rip the images found in this project. The first set of links is for the artist who made the enemy graphics used in the batle system, by following the links you can find some of their work for free, and much more at a reasonable price. The other Links are for the most of the images I used as backgrounds. They are free to Use as long as those links back to the site I got them from/ made them are present. Underneath all of this is a button to return you to the Title Page.

#### The Login/Sign up Screen:

>In this view is a simple form asking for a unique username, and password, and three buttons The first button will submit the form, and either register your username, and password, or retrieve your existing user data, and then automatically route you to the Load Game Screen. All logins are given a unique token via JSON web Token that is stored in your browsers local Storage until logout, this token is used in several places to determin how the game should display information to the user, or under certain circumstance change where the user is routed after certain actions, and finally password encryption/comparison is handled through Bcrypt salt methods.

 ####  The Load Game Screen:

> This View is only avaliable to a user with an authenticated login, it is accessable both from the Login/Sign up screen, and from in game as long as an active token is present on Local Storage.
>
> At the top of this screen you will find a "Start New Game" Button, this button is always present, but if save files are detected it will display a warning to the user that if they choose to start a new game it is **UP TO THE USER** to manage their save files so that they don't loose track of the previous game, they are then presented with a confirmation request. If they say yes they will be routed to the Game Start Screen, and if they say no the warning and confirmation will disappear and be replaced with the original Start game button. 
>
> Upon arriving on this view an Axios request is automatically made to the server to search the Database for any save files associated with your user id, and then display SIX of them in decending order so that your most recent save is first. ***If no save files are present nothing will be displayed.***
>
> As for the save files themselves these display your Characters; Name, Level, Current Exp/Exp to Next level and the option to either load or delete that file. If Delete is selected the Save File Id is then sent with an Axios request, which queries the Database and deletes the appropriate file. The selection is then removed from your screen, and if there is an undisplayed save file present it will then be displayed at the end of the list. When you choose to load a file, the file id is sent to the server which queries the database for that file, then parses the information into something JavaScript can read, and is sent to the front end where it is loaded into the appropriate Context States, and finally you are routed to the Game Map screen.

#### The Game Start Screen:

>The Game Start Screen is fairly straight forward, if you are playing without a login there is a warning telling the user that their data **WILL BE LOST** when the tab/browser is closed, or the page/tab is refreshed. If an active token is detected this warning will instead remind the user to always Save Early Save Often, because data can be lost if the page refreshes unexpectedly, and of course because you never know when the game might decide to give you an unfair match up.
>
>Underneath the warning is a simple input for your character name, a default is provided, and button to begin the game. When the button is pressed the value entered into the input field, regardless of what it is, is saved to your character objects name attribute, and saved to The Player Context, and you are then Routed to the introduction Screen.
>
>For anyone wondering why only a name input is here, I chose to let the user decide who their character is for themselves, that is why this game will largely be in First person view. The Players Character will NEVER have a sprite. Though I am working on Implementing a way to let them upload a face graphic for themselves.

- #### The Introduction Screen:

> This screen is only accessable from the Game Start Screen, and for the moment only displays two paragraphs of "Plot" for the user. This will be expanded upon in future updates. Once you have read the Introduction you may **Click Anywhere** on the screen to progress to the game map.


#### The Game Map:

> On the game Screen there is a lot more going on than it looks like at first. A more indepth walkthrough of the features listed will be in the following section.
>
>The background was made in photoshop using a tileset I have from my hobby platform.
>
>On this screen there are currently four buttons, and a small list of keybindings, and a hidden feature that is only present in the dev environment.
>
>The Main Menu is opened by clicking the blue button in the upper right of the screen OR by pressing the "Q" key. The Main menu is a modal and backdrop combo that displays a series of selections, and a display for the ammount of in game currency you have. **The Selections will change if an active login token is or is not detected.** 
>
>The Shop can be opened by clicking the button in the lower center left, or pressing the "W"  key. The store is another modal where the user can buy and sell equipment and Consumable items.
>
> The button in the center of the screen is the Enter battle button Clicking this or pressing the "E" key will take you to the battle scene.
>
> Then there is the Green button in the upper right-center, This is the fountain which will give you a full heal for FREE. You can activate this by clicking the button or pressing thr "R" key.
>
> Lastly the hidden feature is a collection of Play Test/debugging tools I programmed into the game to help perform targeted tests. Especially when it came to testing out all of the working parts of the inventory system.

#### The Battle Scene:

> This Screen is where all of the action is, You have a colosseum themed battlebackground, the enemy graphic, and enemy stat box, The Character commands at bottom center, and then a battle log to the right of the commands where you're tactical data is recorded, and the space to the left is where your item window will appear when the Item command is selected. If you wind the battle the Victory Modal is displayed and you will recieve rewards. Upon Defeat the Gameover Modal is displayed and will either take you back to the title if you aren't logged in, or take you to the Load game screen if you are logged in.


### Game Features:

#### The Main Menu:

> As noted above what the main menu displays will changed if an active login token is present. 
>Assuming you are logged in the menu will display the following:
>
> - Inventory
> - Stats
> - Equip
> - Save Game (*Will not display if user is not logged in.*)
> - Load Game (*Will not display if user is not logged in.*)
> - Logout/Quit Game (*Changes to "Quit Game" if user is not logged in.*)
> - Close Menu (*User can also Press the "Q" key to do this.*)
> - Player Wallet Display
>
> Going in order we will begin with the Inventory Selection;
> When the user selects Inventory from the Main Menu a second modal will appear and take up the portion of the screen left by the Main Menu, **this applies to only the first FOUR menu selections**, from there the user will have the option to pick which kind of Items they wish to view:
>
> - Items: Will display a list of "display cards" with the Name, Description, and the Amount possessed for each item in your inventory.
> - Equip: Will display a list of "display cards" with the Name, Description, and the Amount possessed for each piece of equipment in your inventory.
> - Key-Items: Will display a list of "display cards" with the Name, Description for each of the Key-Items in your inventory.
> - Close: This will close the secondary modal.
>
> The displays will allow for scrolling on the Y-axis should overflow occur. 
>
> The Stat Selection will open a modal that will display all of your characters current stats, the look is LOOSELY based on an old DND character sheet. It will Display your Characters name, level, current Exp/ Exp to Next Level, then list the Base values of each attribute; HP, Attack, Defence, and Agility, the amount being added from your current equipment, and finally what the total value of that attribute after applying the equipment value. There is also a close button at the bottom that will close this modal, but leave the main menu open.
>
>The Equip Selection is where you can change your characters equipment, there is a selection input for each equipment slot the character possesses;
>
> - The Weapon Slot: Will filter your equipment inventory for every entry with the Type attribute of "Weapon" and set it to the drop down option list.
> - The Shield Slot: Will filter your equipment inventory for every entry with the Type attribute of "Shield" and set it to the drop down option list.
> - The Helmet Slot: Will filter your equipment inventory for every entry with the Type attribute of "Helmet" and set it to the drop down option list.
> - The Armor Slot: Will filter your equipment inventory for every entry with the Type attribute of "Armor" and set it to the drop down option list.
> - The Accessory Slot: Will filter your equipment inventory for every entry with the Type attribute of "Accessory" and set it to the drop down option list.
>
> Once you have made a selection the equipment is automatically equipped, and removed from your inventory, and the previous equipment added back into your inventory. If the item you equipped is the last one in your inventory it will be removed from the drop down when the state is updated. All changes to equipment can be seen in a small box below this titled Current Equipment, and is actively updated when ever you make a selection in one of the inputs. Once again there is a close button at the bottom to close out this second modal.
>
> The Save Game selection will open another modal which will display a message asking if you want to save, and the basic information about your character: Name, Level, Current exp/Exp to next level, and the base attribute values. Followed by a Save and close button, if you press save the message asking you if you want to save will change to display "Now Saving..." While ALL of the users character data, current equipment, wallet, and inventories are then sent to the server where they are stringifyed, compiled into one object, and saved to the database where it is now linked to the current logins user Id so that only that user can access it. when the save is complete the modal will automatically close. If you hit the close button, you guessed it, the secondary modal will close.
>
>  The Load Game Selection will route you to the load Game Screen. ***WARNING This is currently a one way trip. make sure you have saved!***
>
> The Logout Selection will Clear the local Storage, route you back to the title screen, and refresh the page to reset the Context States. If you are not Logged in this will instead say "Quit Game" and route you to the title screen and refresh the page.
>
> The Close Menu Selection is self explanitory. ***It should be noted that you can press this button or the "Q" key at anytime while the Main Menu is open and EVERYTHING will close. Including the Secondary Modals. Also, if you click on any of the selections that open a secondary modal while one is open it will close your current modal and display a new one.***
>
> The Wallet display will show you the current value associated with the Players Wallet State. I use an original made up currency Called Xal in my games.

#### The Fountain:

> The fountain is currently a placeholder for what will eventually become the Inn. When you click the button or press the "R" key, a function is called from context that will heal your character to their current TOTAL HP, and display a message telling you "You rested at the Fountain, and are now fully healed!" That way the User actually knows what just happened. this message is set on a timer so after about five seconds have elapsed it will disappear until you rest again. I highly reccomend resting at the fountain after EVERY FIGHT. Not just because it's a good habit, but because of a few things that will be covered when I talk about the Battle System itself.

#### The Store:

>The Store is accessed by either clicking the Store Button or pressing the "W" key, this will open a full screen modal, that you can close by using the "Close" button or simply pressing "W" again. just like with the Menu pressing "W" will terminate ALL Shop related U.I.
>
> The store is where the user can spend their hard earned reward money on Items and New Equipment, or else Sell unwanted items and equipment. The U.I here is straight forward the User selects either buy or sell, and then selects Items or Equipment. When Buying each display card will contain the Name, Description, and price of the Item or equipment, and a buy button. When Selling it is almost identical exepts the the amount the player owns is also included, and obviously the BUY button now says SELL.
>
> Currently Each time you click the Buy/Sell button on the display card a single item/equipment will be added to or subtracted from your inventory at a time. In the event that you sell ALL of an item in your possession it's card will be removed from the display, and the entry totally removed from your inventory, and the price/Sale Price will be subtracted from or added to your player wallet.

#### Character:

> The Character, and all realated information is Located in a Context store. It contains the Player Object, the Equipment Slot states, and all the functions to handle level up.
>
> The Chracter Object holds the Name, and Base attributes of the character.
> The Level and Experience values are stored on state in the context
>
> Whenever The player gains Experience from a battle a series of Functions controlled by Use Effectr run to update the Current Exp value, and then check it against the Ammount Needed for next level. If the Current Exp value exceeds the amount needed for next level a Level up function is run which subtracts the Needed Exp from the current value, Updates The playes level value, Increases each base stat by a random number between 0 and 30 for HP and 0 and 10 for everything else, generates a new target Experience amount by adding the previous amount to a random number between 0 and 200 plus 100, updates all of the states for use.
>
> Also contained in this Context is the function that runs at the beginning of the game, and every time you change your equipment, or level that calculates your total stats and saves it to state, for use by the battle system and Stat Display.

#### Inventory:

> The inventory Management is also handled in a Context Store, and was easily the hardest thing to get up and running due to how many moving parts are needed. Contained in this context are the States for keeping track of the users item, equipment, and key-item inventories, and the users money, as well as every function needed to update those states. 
>
>The Wallet Function works by being fed an amount and a type depending on the type, increase or decrease, the function will then add or subtract the amount provided to/from the users current wallet value, and up date the state with the new value.
>
> Currently there is only a function for adding Key-items, and you can only own one of each key-item. So the function will detect if you own the key-item it is attempting to add, and if you do it does nothing, but if you do not it will be added to your Key-Item inventory, and then Spread to state.
>
> For adding/removing equipment however when adding something the function will check the existing inventory for the item/equipment. If the item/equipment exists in the inventory the item/equipment is extracted from your inventory, the ammount attribute is updated with the number of the item/equipment recieved, the updated item/equipment is then added back into the inventory, and the updated inventory is spread to state. If the item is not in the inventory, it is simply added in as is.
>
> Removing works almost identically, it finds the item/equip in the inventory, determines if the amount to be removed is equal to the amount owned, and if it is it completely removes the item from the inventory. If the amount to be removed is not equal to the amount owned it simply subtracts the amount.
>
> ##### The Difficulty:
>
> As I mentioned I had alot of trouble getting this seemingly direct and to the point system working properly, when fleshing it out to handle objects instead of plain number values it took a lot of experimentation of different ways to detect the entries: I went through .filter(), .findIndex(), etc... before I found the one that worked .find(). After that I then needed to find the way to quickly and smoothly single it out and update it's amount attribute, I again ran the same marathon of methods, this time the one that Succeeded was .indexOf(). Once that headache was out of the wayI then went through two different ways of updating the attribute, before I found the one that actually worked. The first two would only update the attribute ONCE so you're inventory would go from One to Two and STAY THERE FOR ALL ETERNITY. After beating my head against my desk for nearly a week on these issues, because All three of these problems were concurrent, I decided the answer was to break down the updating process even more. So the final sequence was that I accessed the Inventory array at the index of the existing item, updated the amount, and then, spread the updated inventory to state. Previously I had been trying to update the attribute as a part of saving to state, I discovered that doing this causes the State to not set correctly, and thus not update.
>
> With that problem solved it was a simple matter to apply it to the equipment function, and then reverse engineer it for the remove functions. I also discovered a seperate issue when designing the Equip Scene, when trying to unequip and existing equipment and equip the new one at the same time would confuse the context, and result in only half of both the add and remove functions running. This issue was fixed by making use of use Effect to control when the second half of the swapping equipment process would execute.
>
> Those two problems combined made for a week and a half long migrain.

#### The Authentication:

> Truthfully this Auth system was one I had made as a part of a unit project, and it fit my need, all it takes is a unique User name, because it will query the database to see if that user name is taken, and a password. Once That is done Bcrypt hashes the password, a logout timer for two days is generated, and then the timer, username, and hashed password are saved to the database where you are given a user ID. Then JSON Web Token generates a Auth token for you, which is then saved to Local Storage along with the Log out timer, and your user id.
>
> When Logging in the user name and password are sent to the server where a query takes place to retrieve your information. If the User name is correct the function will then Run the provided password through BCrypts comparison method to see if it matches the hashed password, if the comparison is successful a Token is generated and your timer is updated. If the two days has elapsed an new timer is set. 

#### The Save/Load System:

> I covered a lot of this in the Main Menu portion, but now that we have covered all of the pertinent features, I can better explain this.
> Originally I wanted to just be able to just save arrays, to the database, but as it turns out that was WAY more Complex than I had time to mess with. So thanks to one of my Cohort members, I was able to find another way of handling the data through the JSON.Stringify and JSON.Parse methods.
>
> When you click the Save button on the save modal, the game takes the following information from context state; The Character object, The existing EXP values, Level, all of the equipment states, the wallet, and all three of the Inventories Bundles them up and ships them off to the server through Axios, where the character Object, and inventories are run through JSON.Stringify and saved to new variables, and The Equipment states are reduced to the ID number associated with the equipment. Once that is complete all of the new variables are then organised and bundled up again this time in the Sequelize (PostgreSQL Dilect) data model present on the server, and saved to the external database where the file is tied to the ID associated with the current log in.
>
> When the user logs in and is taken to the Load screen, an axios request is made on render to retrive the save files that are tied to that user ID, and then sends them to a component that builds a display card for up to SIX of the save files present, which are in descending order so that the most recent one is first. When you Click the Load button the ID of that Save File is sent with another axios request that pulls the specific File you chose, unpacks the data, Runs the inventories and character object through JSON.Parse to restore them to their original state, The Equipment Ids are run through a function to retrieve the associated Equipment objects, everything is saved to their own variables, and sent to the front end where they are loaded into state, thus restoring your progress, and shipping you to the game screen.
>
> To my complete surprise, I HAD NO MAJOR ISSUES when fleshing this out, only a slight conflict where the ids of certain load files would get mixed up, and that was fixed by giving keys to rendered files, and making the second axios request.

#### The Battle System:

> The battle system was perhaps the most intimidating feature at first, but once I got started it came together like it was meant to be.
>
> So U.I wise this battle system is very basic, you have a battle background, and enemy graphic, enemy stat display, player display, player commands, and a Battle log. So lets start from the top;
>
> ##### Known Issues:
> First and foremost this battle system is not very well paced, for example if the enemy goes first you will take damage as soon as initative is decided this can lead to instant knock outs if you are not careful.
> Secondly the styling and reactive design of this app is still a work in progress, right now support for resolutions between 1920 x 1080 and 2560 x 1440 is avaliable. anything smaller or bigger than that will result in the graphics being displaced. 
> ***I am actively working on fixing this.***
>
> ##### Enemy Generation:
>
> When the user arrives on the Battle Screen, An enemy is randomly generated by selecting a random entry from the enemy.json file which provides the name and graphic, and then it's stats are randomly generated according to the users level progression, Lvl.1 of course gives the weakest enemies, but due to the way stats are generated it is possible for you to get something that is barely too strong. Once the user is at level 2 enemy stats are generated so that the user will recieve an enemy with stats between level 2 and 5, once at level 6 it will be upped again so that the user will recieve level 6- 10 enemies, at level 11+ though I changed the formula so that the enemies stats are based of of the Characters current TOTAL stats thus forcing the user to manipulate their weapons and armor, use items and in general think about how to handle the fight so that they can win. 
>
> The enemy can currently only attack and defend.
>
> ##### Initative:
>
> Initative is straight forward the Characters total Agility stat is compared to the enemys' Agility stat, and the higher number wins Initative. You will frequently lose this because of how the agility stat is calculated for the enemy at higher levels. This will be remedied in the future.
>
> ##### Battle Log:
>
> This Fun little window will be where 90% of the tactical information will be, This Chat Window will display how much damage the character takes, how much damage the character does to the enemy, if the Character or enemy is defending, and how much the Character heals for when using an item. Then the view will automatically scroll to the bottom where new entries appear whenever a new message is generated. This is achieved with the help of the Use Ref hook.
>
> ##### Character Commands:
>
> The character commands consist of four buttons that only appear on the players turn. The buttons are:
> - Fight
> - Defend
> - Item
> - Flee
>
> Selecting the Fight command will have the player attack the enemy.
> Selecting a defend will activate a flag telling the game that you, or the enemy when they choose to defend, are defending.
> Selecting Item command will open a window to the left of the player commands that will allow you to view and use one of your possessed items to heal. When you pick an item or click the close button the window will close.
>Selecting Flee will immediately terminate battle and return you AS YOU ARE to the game map.
>
> ##### Battle Calculations:
>
> When the player or enemy decideds to attack The Player/enemy Attack stat, the Player/Enemy defense stat, and the Player/Enemy defender flag is sent to the server. If the Defender flag is TRUE the defenders' defense is multiplied 1.5 times usually allowing for damage negation. Once the Defense has been settled the attackers attack stat is subtracted by the defenders defense, and the difference is returned to the front end as damage that is posted to the battle log, and subtracted from the defenders hp. If the Defenders defense is higher than the attackers attack stat a value of 0 is returned. Also if the attack would reduce the defender to negative HP, the defenders hp is set to 0 instead and either the Gameover or the Victory modal is displayed.
>
> When the Player chooses to use an item the users current HP, total HP, and the items healing value are sent to the server where the ammount healed is added to the current Hp and if the amount healed would exceed the Total HP current hp is set to the total Hp, and the amount healed and the restored hp are returned to the front end where the amount healed is posted to the battle log and the new current hp value is applied to the character object. In the case of the elixer and the Megalixer which use percentages, the elixer will divide the Total HP by 2 and that will be the healed amount which is then handled like normal, and the megalixer just sets the current HP to the total HP.
>
> ##### Victory Modal:
>
> in the event that the Player wins the battle this modal is displayed and the player recieves a random amount of EXP, Money, a random Item, and a random equipment. Which are displayed on the screen. if the player has gained enough EXP to level up a message will appear below the EXP message telling the user that they gained a level. Clicking the close button will return the player to the game screen AS THEY ARE Remember to heal.
>
> ##### Gameover Modal:
>
> If the player loses the battle this modal will display, and two different things will happen depending on if an active login token is present. If there is an active token clicking Quit will return you to the load game screen. If there is NO active token clicking Quit will return you to the title screen and reset the context for a new game.

## CREDITS:

First of All: Huge thanks go out to the Staff at Devmountain, for their amazing teaching and support, and my Fellow React Specilization members for countless hours of Paired Programming and helpful suggestions!


<h1 className='text-3xl italic font-bold'>Static Battler Graphics by Ækashics:</h1>
<h2 className='text-3xl italic font-bold text-red-700'>If you like the Battler graphics please follow one of the links which will take you to where you can get access to them and Support this awesome Artist.</h2>
 <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='http://www.akashics.moe'>http://www.akashics.moe</a>
 
 <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://aekashics.itch.io/'>https://aekashics.itch.io/</a>

<h1 className='text-3xl italic font-bold'>Half-Road Productions Icon:</h1>
<a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.canva.com/'>Made using resources on Canva.com.</a>
        

<h1 className='text-3xl italic font-bold'>Colosseum Battle Background:</h1>
<a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href="https://www.vecteezy.com/free-vector/battle-background">Link to: Battle Background Vectors by Vecteezy</a>
<a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.vecteezy.com/vector-art/15370321-ancient-roman-arena-for-gladiators-fight'>Link to: The Background Image</a>
       
<h1 className='text-3xl italic font-bold'>Crossed Swords graphic used in W.I.P Title Image:</h1>
 <a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.vecteezy.com/vector-art/7275947-swords-crossed-emblem'>https://www.vecteezy.com/vector-art/7275947-swords-crossed-emblem</a>

<h1 className='text-3xl italic font-bold'>Parchment Background:</h1>
<a className='mb-3.5 p-2 border-8 border-double border-black text-3xl font-bold text-blue-700 italic underline ' href='https://www.myfreetextures.com/worn-parchment-paper-2/'>Link to: An old and worn out parchment paper background texture
By: Phil</a>