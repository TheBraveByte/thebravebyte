# Hi, I'm Yusuf Akinleye 👋

## 💻 Backend Engineer | Go & Python Developer 🌍

With 4+ years of experience crafting reliable backend systems in Go and Python, I develop software that connects data with people. My work spans healthcare, financial technology, and distributed ledger projects where I've built responsive interfaces between applications and databases.

I create fast, dependable APIs and design data solutions using PostgreSQL and MongoDB Atlas. My technical toolkit includes streamlining deployment processes and creating containerized applications that work consistently across development stages.

**I build reliable software and applications**

Let's work together to transform your concepts into functional, efficient systems.

## 🚀 About Me
* 🔭 I'm currently working on **Velofi**, a personal finance management system
* 🌱 I'm learning JavaScript for frontend development (Vue.js)
* 💬 Ask me about backend development, API design, and Go/Python implementation
* 📫 How to reach me: [ayaaakinleye@gmail.com](mailto:ayaaakinleye@gmail.com) | +2349068849124
* ⚡ Fun fact: I've built a fire detection system using machine learning and I build and orchestrate little vectorization models for LLMs!

## 🛠️ Tech Stack

```go
package main

import "fmt"

func main() {
    techStack := struct {
        Languages       []string
        Frameworks      []string
        Databases       []string
        DevOps          []string
        Tools           []string
        Architecture    []string
        Cloud           []string
        ML              []string
        CurrentlyExploring []string
    }{
        Languages:      []string{"Go", "Python", "JavaScript", "C++", "HTML", "CSS3"},
        Frameworks:     []string{"Fiber", "Gin", "FastAPI", "gRPC"},
        Databases:      []string{"MongoDB", "PostgreSQL"},
        DevOps:         []string{"Docker", "AWS Elastic Beanstalk", "Nginx", "Travis CI"},
        Tools:          []string{"Git", "GitHub", "Postman", "PyCharm", "JupyterNotebook"},
        Architecture:   []string{"Domain-Driven Design", "Package-Oriented Design", "RESTful APIs"},
        Cloud:          []string{"AWS", "Cloudinary"},
        ML:             []string{"PyTorch", "TensorFlow"},
        CurrentlyExploring: []string{"Vue.js", "Neural Networks", "Blockchain Integration"},
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

## 🧰 Technologies & Tools

### Languages
<p>
  <img alt="Go" src="https://img.shields.io/badge/-Go-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img alt="C++" src="https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=cplusplus&logoColor=white" />
  <img alt="HTML" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
</p>

### Frameworks & Libraries
<p>
  <img alt="Fiber" src="https://img.shields.io/badge/-Fiber-00ACD7?style=flat-square&logo=go&logoColor=white" />
  <img alt="Gin" src="https://img.shields.io/badge/-Gin-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img alt="gRPC" src="https://img.shields.io/badge/-gRPC-2DA6B0?style=flat-square&logo=google&logoColor=white" />
  <img alt="Vue.js" src="https://img.shields.io/badge/-Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white" />
  <img alt="PyTorch" src="https://img.shields.io/badge/-PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" />
  <img alt="TensorFlow" src="https://img.shields.io/badge/-TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" />
</p>

### Databases & DevOps
<p>
  <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img alt="AWS" src="https://img.shields.io/badge/-AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white" />
  <img alt="Nginx" src="https://img.shields.io/badge/-Nginx-269539?style=flat-square&logo=nginx&logoColor=white" />
  <img alt="Travis CI" src="https://img.shields.io/badge/-Travis_CI-3EAAAF?style=flat-square&logo=travis-ci&logoColor=white" />
  <img alt="NeonDB" src="https://img.shields.io/badge/-NeonDB-00E699?style=flat-square&logo=neon&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/-Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img alt="Render" src="https://img.shields.io/badge/-Render-46E3B7?style=flat-square&logo=render&logoColor=white" />
</p>

### Tools
<p>
  <img alt="Git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" />
  <img alt="GitHub" src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white" />
  <img alt="Postman" src="https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white" />
  <img alt="PyCharm" src="https://img.shields.io/badge/-PyCharm-000000?style=flat-square&logo=pycharm&logoColor=white" />
  <img alt="VS Code" src="https://img.shields.io/badge/-VS%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" />
  <img alt="GoLand" src="https://img.shields.io/badge/-GoLand-000000?style=flat-square&logo=goland&logoColor=white" />
  <img alt="WebStorm" src="https://img.shields.io/badge/-WebStorm-000000?style=flat-square&logo=webstorm&logoColor=white" />
  <img alt="JupyterNotebook" src="https://img.shields.io/badge/-Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white" />
</p>

### 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=TheBraveByte&show_icons=true&theme=radical" alt="Yusuf's GitHub stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=TheBraveByte&layout=compact&theme=radical" alt="Top Languages" />
</div>

<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=TheBraveByte&theme=onedark" alt="GitHub Trophies" />
</p>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=bravebyte_&theme=radical" alt="Yusuf's wakatime stats" />
</div>

<!-- ### 🏆 Coding Profiles

<p align="center">
  <img src="https://leetcard.jacoblin.cool/_ayaa__?theme=dark&font=Roboto&ext=contest" alt="LeetCode Stats" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HackerRank-@ayaaakinleye-brightgreen?style=for-the-badge&logo=hackerrank" alt="HackerRank Profile" />
</p> -->

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=TheBraveByte&color=blue" alt="Profile views" />
</p>

## 🔍 Featured Projects

* **Velofi** - Personal finance management system with secure transaction tracking
* **Numeris** - Invoice management system with JWT authentication and MongoDB
* **Machine-Learning Fire Detection** - Dual-node IoT system using ESP32 and Raspberry Pi for real-time fire detection
* **GoRide** - Ride-hailing platform for 2,300+ concurrent campus users
* **Wayg** - Digital gift card platform with a loyalty point system (at Volomn)

## 📝 Latest Blog Posts
<!-- BLOG-POST-LIST:START -->
- [Understanding Fan-Out Concurrency Pattern in Go](https://ayaacodes.hashnode.dev/understanding-fan-out-concurrency-pattern-in-go)
- [Concurrency Patterns in Go: A Practical Guide](https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide)
- [Concurrency Patterns in Go: Wait for Results](https://ayaacodes.hashnode.dev/concurrency-patterns-in-go-a-practical-guide)
<!-- BLOG-POST-LIST:END -->

Visit my [Hashnode blog](https://ayaacodes.hashnode.dev/) for more articles on Go development, API design, and backend engineering.
