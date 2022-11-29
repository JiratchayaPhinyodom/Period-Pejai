![example workflow](https://github.com/JiratchayaPhinyodom/Period-Pejai/actions/workflows/python-app.yml/badge.svg)
[![codecov](https://codecov.io/gh/JiratchayaPhinyodom/Period-Pejai/branch/master/graph/badge.svg?token=T39NFVDGVT)](https://codecov.io/gh/JiratchayaPhinyodom/Period-Pejai)

[//]: # ([![codecov])
# Period-Pejai

## What does it do?

This website is used to count menstrual cycles, calculate the next menstruation, ovulation date, chance of pregnancy and record symptoms during menstruation. It also alerts users (through LINE bot) about the next menstruation period and it can be used to check the chances of getting pregnant too. In addition, the data recorded within the app can be used as information for the doctor. The doctor can assess the risk of developing related diseases based on the history of the menstrual cycle and recorded symptoms such as ovaries malfunction, uterine fibroids, and cervical cancer, etc.

## Who are the intended users?

This website is intended primarily to help menstruating women, but men can also use it to help their wives, moms to calculate or record health problems or take medication reminders.

## Why did you choose this topic?

Since all of our team members are female and understand the issues that arise in women very well, we wanted to create this website to help women with their menstrual and birth control issues. We often don't know when our periods will come, causing us to encounter problems with menstrual cramps unexpectedly.

## How to Install

Clone this repository into your local working space.

```
    https://github.com/JiratchayaPhinyodom/Period-Pejai.git
```

Next, you have to install the packages that are required for this repository.

```
    pip install -r requirements.txt
```

Lastly, you have to build your server using `.env` file (you can see the tamplate in sample_front.env for frontend and sample.env for backend).

## How to Run

You can run the server by:

For backend, 

First,
```
cd period
```

Next, 
```
python manage.py runserver
```

Now, you can visit the link of backend (Django-Rest) `http://localhost:8000`.

Then, you have to open a new terminal for frontend and type

```
cd ..
```
to move back to the outer directory

```
cd front-end
```

Next, 
```
npm install
```

After that,

```
npm start
```
Now, you can visit the link of backend (Django-Rest) `http://localhost:3000`.



## For more details
- [User Stories](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/User-Stories)
- [Iteration 1 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-1-Plan)
- [Iteration 2 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-2-Plan)
- [Iteration 3 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-3-Plan)
- [Iteration 4 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-4-Plan)
- [Iteration 5 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-5-Plan)
- [Iteration 6 Plan](https://github.com/JiratchayaPhinyodom/Period-Pejai/wiki/Iteration-6-Plan)
