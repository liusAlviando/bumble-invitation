import CardDeck from "../components/CardDeck"

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
        <div className="h-full w-full pb-[70px]" style={{overflowX:'visible',overflowY:'visible'}}>
            <CardDeck></CardDeck>
        </div>
    </div>
  )
}

export default Home