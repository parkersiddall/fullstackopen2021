import React, {useState} from 'react'

const NewBlogForm = ({
    handleNewPost,
    handleTitle,
    handleAuthor,
    handleUrl,
    title,
    author,
    url
}) => {
    return(
        <div> 
            <form onSubmit={handleNewPost}>
                <div>
                title
                    <input type='text' 
                    value={title} 
                    name='title' 
                    onChange={handleTitle}
                    />
                </div>
                <div>
                author
                <input
                type='text'
                value={author}
                name='author'
                onChange = {handleAuthor} 
                />
                </div>
                <div>
                url
                <input
                type='url'
                value={url}
                name='url'
                onChange = {handleUrl} 
                />
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default NewBlogForm
