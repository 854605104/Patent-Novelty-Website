# Patent-Novelty-Website
*My iUROP Project in SUTD.*  2018.12.15

Can **try** on http://liyanzhang.cn/index.html



![Website Interface](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/DEMO1.jpg)



## Original Interface and Introduction to Website

![Orginal Interface](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/Original.jpg)
http://www.innogps.com/patent_assessment/index.html

The website is for assessing patent potential value via a new assessing way. This way is conducted by Prof.Luo Jianxi and Dr.He Yuejun, researching in

[SUTD-MIT International Design Center]: https://idc.sutd.edu.sg/

, Singapore University of Technology and Design. 



## The New Frame of Usage

![User Operation](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/Patent%20Novelty%20use%20frame.png)

![Website Logic](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/Patent%20Novelty%20Frame.png)

I reframe the website with 3 main pages: **Home Page**, **Demo Page** and **How it works Page**.

## New Design and Interface

**Home Page** is designed for skillful users to quickly search patents by their keywords or ID, and assess them quickly. The core of it is to display the result and get operations easier.

![Home Page - ID Search](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/ID.jpg)



![Home Page - Keywords Search](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/KEYWORD.png)



**Demo Page** is designed for first time user, and I add a **Cookie Judgement** here to judge whether the user is a first-time user or not. And the demo will be offering the users with 3 patents, they can choose one to assess and see the result.

![Demo Page](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/DEMO1.jpg)



![Demo Page - Patent 02](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/DEMO2.jpg)

**How it works Page** is trying to explain the assessment method to the user. But the principles behind is too complicated, I tried, but since time is limited, I just put a draft on it.

![Draft of How it works Page](https://raw.githubusercontent.com/854605104/PicgoRepo/mater/How%20it%20works.jpg)



## Core Code

### Particle.js

By using particle.js, it is very easy to create a simple interaction on Demo Page, so that it would not be too dry to try.



### D3.js

By using d3.js, I could draw the matrix of the distribution. By changing the json file of the data, the color will accordingly change.



And also, **jQuery** is used in the website.

