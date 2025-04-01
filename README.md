# Hi, I'm Yusuf Akinleye 👋

![Coding Illustration](https://raw.githubusercontent.com/abhisheknaiidu/abhisheknaiidu/master/code.gif)

💻 Backend Engineer | Go & Python Developer 🌍

I'm a passionate software engineer focused on creating scalable and maintainable server-side applications. With 5+ years of experience, I enjoy tackling complex challenges and delivering reliable solutions through clean code and thoughtful design.

## 🚀 About Me
* 🔭 I'm currently working on Numeris, an invoice management system
* 🌱 I'm learning JavaScript for frontend development (Vue.js)
* 💬 Ask me about backend development, API design, and Go/Python implementation
* 📫 How to reach me: mailto:ayaaakinleye@gmail.com | +2349068849124
* ⚡ Fun fact: I've built a fire detection system using machine learning!

## 🛠️ Tech Stack

```go
package main

import "fmt"

func main() {
    // My Tech Stack
    techStack := struct {
        Languages       []string
        Frameworks      []string
        Databases       []string
        DevOps          []string
        Tools           []string
        Architecture    []string
        Cloud           []string
        CurrentlyExploring []string
    }{
        Languages:      []string{"Go", "Python", "JavaScript", "C++", "HTML", "CSS3"},
        Frameworks:     []string{"Fiber", "Gin", "FastAPI", "gRPC"},
        Databases:      []string{"MongoDB", "PostgreSQL"},
        DevOps:         []string{"Docker", "AWS Elastic Beanstalk", "Nginx", "Travis CI"},
        Tools:          []string{"Git", "GitHub", "Postman", "PyCharm"},
        Architecture:   []string{"Domain-Driven Design", "Package-Oriented Design", "RESTful APIs"},
        Cloud:          []string{"AWS", "Cloudinary"},
        CurrentlyExploring: []string{"Vue.js", "Neural Networks", "PyTorch", "Blockchain Integration"},
    }
    
    results := make(chan string)
    
    go func() { 
        for _, lang := range techStack.Languages {
            results <- fmt.Sprintf("Language: %s", lang)
        }
    }()
    
    go func() {
        for _, framework := range techStack.Frameworks {
            results <- fmt.Sprintf("Framework: %s", framework)
        }
    }()
    
    for i := 0; i < len(techStack.Languages) + len(techStack.Frameworks); i++ {
        fmt.Println(<-results)
    }
}
```

### Technology Icons

#### Languages
<p>
  <img alt="Go" src="https://img.shields.io/badge/-Go-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img alt="C++" src="https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=cplusplus&logoColor=white" />
  <img alt="HTML" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
</p>

#### Frameworks & Libraries
<p>
  <img alt="Fiber" src="https://img.shields.io/badge/-Fiber-00ACD7?style=flat-square&logo=go&logoColor=white" />
  <img alt="Gin" src="https://img.shields.io/badge/-Gin-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img alt="gRPC" src="https://img.shields.io/badge/-gRPC-2DA6B0?style=flat-square&logo=google&logoColor=white" />
  <img alt="Vue.js" src="https://img.shields.io/badge/-Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white" />
</p>

#### Databases & DevOps
<p>
  <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img alt="AWS" src="https://img.shields.io/badge/-AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white" />
  <img alt="Nginx" src="https://img.shields.io/badge/-Nginx-269539?style=flat-square&logo=nginx&logoColor=white" />
  <img alt="Travis CI" src="https://img.shields.io/badge/-Travis_CI-3EAAAF?style=flat-square&logo=travis-ci&logoColor=white" />
</p>

#### Tools
<p>
  <img alt="Git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" />
  <img alt="GitHub" src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" />
  <img alt="Postman" src="https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white" />
  <img alt="PyCharm" src="https://img.shields.io/badge/-PyCharm-000000?style=flat-square&logo=pycharm&logoColor=white" />
</p>

## 📊 GitHub Stats

![Yusuf's GitHub stats](https://github-readme-stats.vercel.app/api?username=TheBraveByte&show_icons=true&theme=radical)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=TheBraveByte&layout=compact&theme=radical)

## ⏱️ Weekly Development Breakdown

[![Yusuf's wakatime stats](https://github-readme-stats.vercel.app/api/wakatime?username=bravebyte_&theme=radical)](https://github.com/TheBraveByte/github-readme-stats)

## 🔍 Featured Projects
* **Numeris** - Invoice management system with JWT authentication and MongoDB
* **Machine-Learning Fire Detection** - Dual-node IoT system using ESP32 and Raspberry Pi for real-time fire detection
* **Bookwise** - E-commerce bookstore with Flutterwave payments and Open Library integration
* **GoRide** - Ride-hailing platform for 2,300+ concurrent campus users
* **Wayg** - Digital gift card platform with loyalty point system (at Volomn)

## 💼 Professional Experience
* **Backend Engineer** - Volomn (Jul 2024 - Oct 2024)
* **Python Developer** - SQE.io, Boston (Sep 2023 - Dec 2024)
* **Senior Software Engineer** - NHIA (Aug 2023 - Jun 2024)
* **Technical Writer** - Earthly Technologies, California (May 2023 - May 2024)
* **Lead Software Engineer** - 1go Technologies (Apr 2022 - Sep 2024)

## 📝 Latest Blog Posts
<!-- BLOG-POST-LIST:START -->
* [Building a Concurrent Mail Server API with Goroutines and Gmail Integration](https://hashnode.com/@YusufAkinleye)
* [Implementing Efficient APIs with Go and MongoDB](https://hashnode.com/@YusufAkinleye)
* [Scaling Applications with Docker and AWS Elastic Beanstalk](https://hashnode.com/@YusufAkinleye)
* [Package-Oriented Design in Go: Best Practices](https://hashnode.com/@YusufAkinleye)
* [Secure Authentication with JWT in Go Applications](https://hashnode.com/@YusufAkinleye)
<!-- BLOG-POST-LIST:END -->

Visit my [Hashnode blog](https://hashnode.com/@YusufAkinleye) for more articles on Go development, API design, and backend engineering.

## 🎓 Education
* **B.Eng. Electrical and Electronics Engineering** - University of Ilorin, Nigeria (2018-2024)
  * CGPA: 4.37/5.0
  * Key Coursework: Digital Control Systems, Control Engineering

## 🔧 Skills Progress

```
Go              ███████████████████████░░   92%
Python          ████████████████████░░░░░   80%
MongoDB         ████████████████████░░░░░   80%
PostgreSQL      ███████████████░░░░░░░░░░   65%
Docker          ██████████████████░░░░░░░   75%
AWS             █████████████░░░░░░░░░░░░   55%
API Design      █████████████████████░░░░   85%
JavaScript      ██████░░░░░░░░░░░░░░░░░░░   25%
Vue.js          ████░░░░░░░░░░░░░░░░░░░░░   20%
```

## 🤝 Connect With Me
[GitHub](https://github.com/YusufAkinleye) | [LinkedIn](https://linkedin.com/in/YusufAkinleye) | [Portfolio](https://portfolio.yusufakinleye.com) | [Hashnode](https://hashnode.com/@YusufAkinleye)

⭐️ From YusufAkinleye
