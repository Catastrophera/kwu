import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.gachaLog.deleteMany()
  await prisma.product.deleteMany()
  
  const products = [
    {
      product_name: "JavaScript Neon Sticker",
      price: 1000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Python Synthwave Sticker",
      price: 1000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "React Cyberpunk Logo",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Next.js Core Sticker",
      price: 1000,
      stock: 20,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "Linux Glitch Emblem",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Vim Hacker Edition",
      price: 1000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "TypeScript Holographic Sticker",
      price: 1000,
      stock: 45,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "HTML5 Retro Shield",
      price: 1000,
      stock: 60,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "CSS3 Neon Badge",
      price: 1000,
      stock: 60,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Node.js Core Reactor",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Go Gopher Cyber Pet",
      price: 1000,
      stock: 15,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "Rust Gear Matrix",
      price: 1000,
      stock: 20,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "C++ Legacy Monolith",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Java Coffee Cup Overlay",
      price: 1000,
      stock: 55,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "C# Sharp Edge Sticker",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "PHP Elephant Hologram",
      price: 1000,
      stock: 70,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Ruby Gemstone Vector",
      price: 1000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "Swift Bird Protocol",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Kotlin Android Frame",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Docker Container Cyberbox",
      price: 1000,
      stock: 15,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "Kubernetes Nexus Helm",
      price: 1000,
      stock: 10,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "AWS Cloud Interface",
      price: 1000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Azure Data Node",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Google Cloud Platform Marker",
      price: 1000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "MongoDB Leaf Database",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "PostgreSQL Elephant Titan",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "MySQL Dolphin Splash",
      price: 1000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Redis Cache Engine",
      price: 1000,
      stock: 45,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Git Version Branch",
      price: 1000,
      stock: 60,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "GitHub Octocat Silhouette",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "GitLab Fox Origami",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Nginx Server Shield",
      price: 1000,
      stock: 45,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Apache Feather Vector",
      price: 1000,
      stock: 55,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Spring Boot Leaf",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Django Pony Core",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Flask Potion Bottle",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Vue.js Prism Logo",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Angular Shield Matrix",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Svelte Flame Emblem",
      price: 1000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "TailwindCSS Wave Logo",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Bootstrap Hexagon Sticker",
      price: 1000,
      stock: 65,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Figma Neon Pen",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Bash Terminal Prompt",
      price: 1000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Powershell Blue Shell",
      price: 1000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Arduino Circuit Board",
      price: 1000,
      stock: 35,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Raspberry Pi Berry",
      price: 1000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg",
      is_gacha_eligible: true
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
  
  console.log("Database seeded!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

