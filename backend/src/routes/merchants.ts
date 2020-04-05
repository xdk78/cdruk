import { ExtendableContext } from 'koa'
import { User } from '../entity/User'

const names = ['Adam', 'Adrian', 'Alan', 'Albert', 'Albin', 'Aleksander', 'Amadeusz', 'Andrzej', 'Antoni', 'Apoloniusz', 'Arkadiusz', 'Arnold', 'Artemon', 'Artur', 'Baltazar', 'Bartek', 'Bartosz', 'Bazyli', 'Benedykt', 'Bernard', 'Błażej', 'Bogdan', 'Bogumił', 'Bogusław', 'Bogusz', 'Bolesław', 'Bolko', 'Borys', 'Bronisław', 'Bruno', 'Cecil', 'Cezary', 'Cyprian', 'Cyryl', 'Czech', 'Czesław', 'Damian', 'Daniel', 'Dariusz', 'Dawid', 'Dobromir', 'Dominik', 'Donald', 'Donat', 'Dorian', 'Edward', 'Emanuel', 'Emil', 'Emilian', 'Ernest', 'Erwin', 'Eryk', 'Fabian', 'Feliks', 'Filip', 'Florian', 'Franciszek', 'Fryderyk', 'Gabriel', 'Gaweł', 'Gerard', 'Gracjan', 'Gromosław', 'Grzegorz', 'Gustaw', 'Gwidon', 'Henryk', 'Herbert', 'Hermes', 'Hieronim', 'Hilary', 'Hipolit', 'Hubert', 'Hugon', 'Ignacy', 'Igor', 'Ireneusz', 'Iwo', 'Izydor', 'Jacek', 'Jakub', 'Jan', 'Janko', 'Janusz', 'Jaromir', 'Jaropełk', 'Jarosław', 'Jeremi', 'Jerzy', 'Jędrzej', 'Joachim', 'Jonasz', 'Jordan', 'Józef', 'Julian', 'Juliusz', 'Justynian', 'Kacper', 'Kajetan', 'Kamil', 'Karol', 'Kazimierz', 'Kiejstut', 'Klemens', 'Klementy', 'Kleofas', 'Konrad', 'Konstanty', 'Kornel', 'Kryspin', 'Krystian', 'Krzesimir', 'Krzysztof', 'Ksawery', 'Lech', 'Leon', 'Leonard', 'Leopold', 'Lesław', 'Leszek', 'Lew', 'Longin', 'Lubomir', 'Lubosław', 'Lucjan', 'Ludomir', 'Ludosław', 'Ludwik', 'Lutomir', 'Lutosław', 'Łukasz', 'Maciej', 'Makary', 'Maksymilian', 'Marceli', 'Marcin', 'Marek', 'Marian', 'Mariusz', 'Masław', 'Mateusz', 'Maurycy', 'Melchior', 'Michał', 'Mieczysław', 'Mieszko', 'Mikołaj', 'Miłosz', 'Miron', 'Mirosław', 'Narcyz', 'Nataniel', 'Nikifor', 'Nikodem', 'Norbert', 'Oktawian', 'Olaf', 'Olgierd', 'Oliwier', 'Oskar', 'Pankracy', 'Patrycjusz', 'Patryk', 'Paweł', 'Piotr', 'Przemysław', 'Radosław', 'Rafał', 'Rajmund', 'Remigiusz', 'Robert', 'Roch', 'Roman', 'Rudolfin', 'Rufin', 'Ryszard', 'Sebastian', 'Sergiusz', 'Seweryn', 'Sławomir', 'Stanisław', 'Stefan', 'Sylwester', 'Szczepan', 'Szymon', 'Tadeusz', 'Teodor', 'Teofil', 'Tobiasz', 'Tomasz', 'Tycjan', 'Tymon', 'Tymoteusz', 'Tytus', 'Urban', 'Wacław', 'Wadim', 'Waldemar', 'Walenty', 'Walerian', 'Wawrzyniec', 'Wiesław', 'Wiktor', 'Wilhelm', 'Wincenty', 'Witalis', 'Witold', 'Władysław', 'Włodzimierz', 'Wojciech', 'Zbigniew', 'Zbysław', 'Zbyszko', 'Zenon', 'Ziemowit', 'Zygmunt']

const offset = () => (Math.random() + Math.random() * -1) * 0.1

export default async function merchants(ctx: ExtendableContext) {
  // ctx.body = await ctx.getRepo(User).find({ isMerchant: true })
  ctx.body = {
    data: Array.from({ length: 10 }, (_, i) => {
      const name = names[Math.floor(Math.random() * names.length)]
      const id = i
      return {
        id,
        name,
        location: `${52.23 + offset()} ${21.01 + offset()}`
      }
    })
  }
}
