import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      product_name: "JavaScript Neon Sticker",
      price: 15000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Python Synthwave Sticker",
      price: 15000,
      stock: 50,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "React Cyberpunk Logo",
      price: 20000,
      stock: 30,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Next.js Core Sticker",
      price: 25000,
      stock: 20,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      is_gacha_eligible: false
    },
    {
      product_name: "Linux Glitch Emblem",
      price: 20000,
      stock: 40,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      is_gacha_eligible: true
    },
    {
      product_name: "Vim Hacker Edition",
      price: 18000,
      stock: 25,
      image_path: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg",
      is_gacha_eligible: false
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
