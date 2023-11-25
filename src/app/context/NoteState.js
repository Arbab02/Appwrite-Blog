import NoteContext from './noteContext';

const NoteState = (props) =>{

    const state = {
        'name': 'Allen',
        'age' :23
    }
return(

    <NoteContext.Provider value={state}>
{props.children}
    </NoteContext.Provider>
)

}

export default NoteState;