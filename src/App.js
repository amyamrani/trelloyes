import React from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends React.Component {
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {}
  //   }
  // }
  // constructor(props) {
  //   super(props)
  //   this.state = { store: props.store }
  // }
  state = {
    store: STORE
  };

  handleDeleteCard = (cardId) => {
    const lists = this.state.store.lists;
    const allCards = this.state.store.allCards;
    console.log(lists);
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  handleAddCard = (listId) => {
    const newCard = newRandomCard()
    
    const newLists = this.state.store.lists.map(list => {
      if (list.id == listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      else {
        return list;
      }
    })

    const newStore = {
      lists: newLists,
      allCards: {
        ...this.state.store.allCards,
        [newCard.id]: newCard,
      }
    };

    this.setState({store: newStore})

    // OR this
    // this.setState({
    //   store: {
    //     lists: newLists,
    //     allCards: {
    //       ...this.state.store.allCards,
    //       [newCard.id]: newCard,
    //     }
    //   }
    // })
  };

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map((list) => (
            <List
              header={list.header}
              key={list.id}
              id={list.id}
              cards={list.cardIds.map((id) => this.state.store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;