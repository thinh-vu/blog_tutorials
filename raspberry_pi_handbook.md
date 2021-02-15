# RASBERRY PI QUICK START GUIDE

## 1. Update system packages

## 2. Install and set Python 3.8 as default python
Read the guide [here](https://github.com/mrthinh/rasberry_pi4/blob/main/guide_book/upgrade_python.md)

## 3. Install ibus vietnamese input method
* Open terminal on Rasberry Pi by press: Ctrl + Alt + T
* Run the following command:
```
sudo apt-get update && sudo apt-get install ibus-unikey
```
* Config ibus-unikey. You may want to change the shortcut combination to change input method from Super + Space into Ctrl + Shift + Space

## 4. Take screenshot with scrot command

## 5. Setup local runtime to run Google Colab Notebook

Although we already upgraded default python from 2.7 to the 3.8 version, we have to use ```pip3``` to install required libraries instead of ```pip``` on Rasberry Pi. Because of when we run ```pip``` command on Terminal, the system understand that it's pip2 version. So, we have to change all the ```pip``` command to ```pip3``` to install required libraries for Google Colab on local machine.

* Step 1: Install jupyterlab

```pip3 install jupyterlab```
To be able to run jupyter notebook from terminal, you need to make sure that ```~/.local/bin``` is in your path.

Do this by running ```export PATH=$PATH:~/.local/bin``` for your current session, or adding that line to the end of ```~/.bashrc``` to make your changes last for future sessions (e.g. by using nano ~/.bashrc). If you edit ~/.bashrc you will need to log out and log back in to make see your changes take effect.

`export PATH=$PATH:~/.local/bin ~/.bashrc`

* Step 2: Install and enable the jupyter_http_over_ws jupyter extension (one-time)

`pip3 install --upgrade jupyter_http_over_ws>=0.0.7 && jupyter serverextension enable --py jupyter_http_over_ws`
* Step 3: Start server and authenticate

```jupyter notebook --NotebookApp.allow_origin='https://colab.research.google.com' --port=8888 --NotebookApp.port_retries=0```
## 6. Install required libraries to use for Python datascience

```

```
## 7. Force Pi boot to UI mode
* Run ```sudo pcmanfm``` to open file manager with root previledge.
* Navigate to the ```/boot``` folder and find ```config.txt``` file to open.
* Remove hash (#) to left this line as ```hdmi_force_hotplug=1```
![Remove overscan black border](https://github.com/mrthinh/data_science_and_automation/blob/main/media/2021-02-06-212658_1920x1080_scrot.png)

## 8. Enable VNC Server from Boot
* VNC has been installed on Rasberry by default. However if you are not using the UI mode. You can install it by this code
```sudo apt update``` then ```sudo apt install realvnc-vnc-server realvnc-vnc-viewer```
* Enable VNC from boot command line
To do with command line. Run this code
```sudo raspi-config```
Navigate to Interfacing Options. Scroll down and select VNC > Yes.
* Enable VNC from boot UI mode
Select Menu > Preferences > Raspberry Pi Configuration > Interfaces.
Ensure VNC is Enabled.

## 9. Understanding pip
* Using pip to install modules for python 3.8 
*The following command will install the latest version of a module and its dependencies from the Python Packaging Index. For instance, install the latest version of pandas.*

`python -m pip install pandas`

* To specific a version of the package. Use one of these command line*

```python -m pip install SomePackage==1.0.4 #specific version
python -m pip install "SomePackage>=1.0.4" #minimum version
```


*To upgrade the current version of a package. Use this

```python -m pip install --upgrade SomePackage```

* work with multiple versions of Python installed in parallel?

```python2   -m pip install SomePackage  # default Python 2
python2.7 -m pip install SomePackage  # specifically Python 2.7
python3   -m pip install SomePackage  # default Python 3
python3.8 -m pip install SomePackage  # specifically Python 3.8
```

*For the full guide. Read it from Python document [here](https://docs.python.org/3/installing/index.html)

# 10. Install Miniconda on Pi
### Install Miniconda package (default python 3.4)
* Run this command to begin installing Miniconda
```
wget http://repo.continuum.io/miniconda/Miniconda3-latest-Linux-armv7l.sh
sudo md5sum Miniconda3-latest-Linux-armv7l.sh # (optional) check md5
sudo /bin/bash Miniconda3-latest-Linux-armv7l.sh # -> change default directory to /home/pi/miniconda3
sudo nano /home/pi/.bashrc # -> add: export PATH="/home/pi/miniconda3/bin:$PATH"
sudo reboot -h now
```
* Type `yes` when asked to accept the terms
* When asked for Path to install miniconda, please input `/home/pi/miniconda3` . We will add this path to path on later step to indicate where to look at and run miniconda.
* Now we need to add miniconda path to bashrc. Run this command
`sudo nano /home/pi/.bashrc`
Navigate to the end of this file and add this line `export PATH="/home/pi/miniconda3/bin:$PATH"`
Now Exist by Ctrl + D and Save by type Y
* Run `conda` to verify if successfully install
### Upgrade python on Miniconda
* The python installed along with miniconda was python3.4. To use the latest python or to work with Google Colab on Local machine, you should install the latest conda.
`conda config --add channels rpi`
Now I add Berryconda - the package manager by jjhelmus
`conda install python=3.8`
Now I need to select the environment with python version added

`conda create --name py38 python=3.8`
* Now we can activate the enviroment  ```source activate py38```
# 11. Using pydrive to exchange file with Google Drive
## 11.1 Authorizations 
* Create a project folder, for example _pydrive_
* Copy these lines of code and create a `quickstart.py` file inside the folder you just created
```
from pydrive.auth import GoogleAuth
gauth = GoogleAuth('/home/raspi/Documents/pydrive/settings.yaml') #define the absolute file path so we can python file on terminal or crontab without any issues 
gauth.LocalWebserverAuth() # Creates local webserver and auto handles authentication.
from pydrive.drive import GoogleDrive
drive = GoogleDrive(gauth)
```
* Copy/create a `settings.yaml` file inside _pydrive_ folder.

```
client_config_backend: settings
client_config:
  client_id: 9637341109347.apps.googleusercontent.com #Don't worry about this id, it's just a sample
  client_secret: psDskOoWr1P602PXRTHi  #Don't worry about this secret, it's just a sample

save_credentials: True
save_credentials_backend: file
save_credentials_file: credentials.json

get_refresh_token: True

oauth_scope:
  - https://www.googleapis.com/auth/drive.file
  - https://www.googleapis.com/auth/drive.install
```
* Run the `quickstart.py` file and authorize for your first time with Google. After that, you won't need to authorize again. A `credentials.json` file is automatically create when you run the `quickstart.py` file.
## 11.2. Upload file to Google Drive
Add these lines of code to the `quickstart.py` file, then you can upload a local file to a specific folder in Google Drive by its ID
```
db_funnel_upload = drive.CreateFile()
db_funnel_upload = drive.CreateFile({'title': "db_aip_query_2021-01-01_to_2021-02-08_pydrive.csv", 'parents': [{'id': '1T-V4WqTaMsBfVTFd7Xq71RiEIarOf20k'}]})
db_funnel_upload.SetContentFile('/home/pi/Documents/Colab Notebooks/data/db_query/db_aip_query_2021-01-01_to_2021-02-08.csv')
db_funnel_upload.Upload()
```
# 12. Cloud sync on Raspi with Rclone
## 12.1. Google Drive Sync
## 12.2. OneDrive Sync 
### 12.2.1. Create an application on Microsoft Azure
1. Log in to Microsoft Azure portal.
2. Search "Azure Active Directory" at the top of text input box. And open "Azure Active Directory".
3. Click "App registrations" at the left side bar.
* In my environment, when I used Chrome as the browser, no response occurred. So in that case, I used Microsoft Edge.
4. Click "New registration"
* app name: "sample app name"
* Supported account types: "Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)"
* Redirect URI (optional): Web
  - URL: here, please do the blank.
5. Click "Register"
6. Copy "Application (client) ID".
7. Click "Certificates & secrets" at the left side bar.
8. Click "New client secrets".
9. After input the description and select "expire", click "Add" button.
10. Copy the created secret value.
11. [Help](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in image
![image azure](https://github.com/mrthinh/data_science_and_automation/blob/main/media/rclone_raspi_azure.png)

# 13. Scheduling your script with crontab
* **What is cron?**
Cron is a time based scheduler found in “Unix-like” operating systems (such as Raspbian). Just like setting up a notification or recurring notification in a calendar or scheduling app for day to day appointments, Cron allows you to schedule scripts and programs. 

* **How To Create And Edit Cron Jobs?**
Open terminal, and input  ```crontab -e``` to start editting crontab. Add new line at the end of file. When you done, press `Ctrl + O` to write your changes, just enter at the next step if you don't want to change the file name, then `Ctrl + X` to exit.

* Understanding the schedule options

**Minutes**
Since minutes are the first component of a schedule we will go into depth on this one. Minutes can be entered as an asterisk (representing any/all), a number (between 0-59), a comma separated list of numbers, a range of numbers, step values, or a combination of these commands.

Inputting an “ * “ means “any value” and will run the code any minute – meaning your script would run every minute of the hour.
Inputting a number between 0 and 59 will run the script at a specific minute. An entry of 5 would mean your script runs 5 minutes into an hour.
Inputting a comma separated list of numbers like: 5,15,47 would result in your script running at minute 5, 15, and 47 of the hour.
A range of minutes can also be entered using a dash. 5-47 would result in your script running every minute between minute 5 and 47 of an hour.
A step value can also be set up. Using */5 would run your script every 5 minutes of an hour (the equivalent of entering 5,10,15,20,25,30,35,40,45,50,55)

**Hours, Days, Months, Days of Week**
 
Hours are the second component of the schedule. Just like minutes, hours can be entered as an asterisk, a number (between 0-23), a comma separated list, a range of numbers, a step value, or a combination of the above. We wont go into the same level of detail as above in this example as the same principles apply to hours, days, months, and day of week as they do to minutes.

The third component is Days of a Month. This component accepts numbers between 1 and 31. In months where there are less than 31 days, numbers above the number of days are ignored. Days of a month can be used to run programs on odd or even days (like our irrigation system) using a step value within a range value. Example: Odd Days would be entered as 1-31/2 (every second day of the month starting with 1) while even days is entered as 2-30/2 (every second day of the month starting with day 2)

The forth component is Months. Just like minutes and hours, months can be entered as an asterisk, a number (between 1-12), a comma separated list, a range of numbers, a step value, or a combination of the above.

The fifth component is Day of the Week. This is a bit different as it allows you to run a daily script on a specific day of the week rather than a the day of a month. If you wanted to run something on Mondays or Sundays regardless of what number the day is, this would be where you enter it. Just like every previous component, days of the week can be entered as an asterisk, a number (between 0-6), a comma separated list, a range of numbers, a step value, or a combination of the above. The week starts on Sunday (0) and goes to Saturday (6). Entering 7 will work, however it is non-standard. It is the same as entering 0 and represents Sunday.

**The Script To Run**
The final component is the script that you want to run. In our example we are going to run a python 3 script called “test.py”. We have saved this in the default directory of /home/pi/.

We would enter component six as:
python3 /home/pi/test.py

The script can be anything you can run in the terminal and is not limited to python programs or other scripts, replacing your command with: sudo reboot now would make your Pi restart anytime the scheduled task runs.

![Cron structure](https://bc-robotics.com/wp-content/uploads/2019/08/5-1.jpg)

# 14. Install Dbeaver community edition
_dbeaver for Rasberry Pi seems doesn't work at that time_
* Enable snaps on Raspberry Pi and install dbeaver-ce
```
sudo apt update
sudo apt install snapd
```
* You will also need to update snap store and reboot your device to take effect:
```
sudo reboot
```
* Install dbeaver-ce
```
sudo snap install dbeaver-ce
```


