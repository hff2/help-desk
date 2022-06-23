import { useSelector } from 'react-redux';

function NoteItem({ note }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <div
            className='block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 mb-6'
            style={{
                backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
                color: note.isStaff ? '#fff' : '#000',
        }}
        >
            <h4 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>
                Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
            </h4>
            <p className='font-normal text-gray-600'>{note.text}</p>
            <div className='text-sm text-gray-400 mt-4'>
                {new Date(note.createdAt).toLocaleString('zh-tw')}
            </div>
        </div>
    );
}

export default NoteItem;