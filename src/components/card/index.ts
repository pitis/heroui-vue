import { cardVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import CardRoot from './Card.vue'

export { cardVariants }

const slots = cardVariants()
const CardHeader = part('CardHeader', 'div', 'card-header', slots.header())
const CardTitle = part('CardTitle', 'h3', 'card-title', slots.title())
const CardDescription = part('CardDescription', 'p', 'card-description', slots.description())
const CardContent = part('CardContent', 'div', 'card-content', slots.content())
const CardFooter = part('CardFooter', 'div', 'card-footer', slots.footer())

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle }
