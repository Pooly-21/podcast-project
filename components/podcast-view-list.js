import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
            sorting: { state: true },
            search: { state: true },
        
        }
    }

    constructor() {
        super()
        this.disconnectStore = connect((state) => {
            if (this.previews !== state.previews) { this.previews !== state.previews }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting }
            if (this.search !== state.search) { this.search = state.search }
        })
        
    }

    static styles = css`

/* HEADER AND STICKY NAV BAR*/

.content {
    max-width: 1250px;
    margin: auto;
}
.navbar{
    position: fixed;
    z-index: 5;
    width: 100%;
    padding: 25px 0;
    background: rgba(0,0,0,0.5);
    transition: all 0.3 ease;
}
.navbar.sticky{
    padding: 10px 0;
    background: #1b1b1b;
}
.navbar .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar .logo a {
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    text-decoration: none;
}
.navbar .menu-list {
    display: inline-flex;
}
.menu-list li {
    list-style: none;
}
.menu-list li a{
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    margin-left: 25px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-shadow: 1px 1px black;
}
.menu-list li a:hover {
    color: darkorange;
}

/* Background image */
.banner {
    height: 100vh;
    background: url("assets\Popdcast_background.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* BURGER BAR AND EXIT FROM MENU*/
.icon {
    color: rgb(255, 0, 0);
    font-size: 20px;
    cursor: pointer;
    display: none;
}
.icon.cancel-btn{
    position: absolute;
    right: 30px;
    top: 20px;
}

/* MEDIA QUERIES */

@media (max-width: 868px) {
    .icon {
        display: block;
    }
    .icon.hide{
        display: none;
    }
    .navbar .menu-list {
        position: fixed;
        top: 0;
        left: 0; /* -100% */
        height: 100vh;
        width: 42%;
        background: #222;
        display: block;
        padding: 40px 0;
        text-align: center;
        transition: all 0.3 ease;
    }
    .navbar .menu-list.active{
        left:0%
    }
    .navbar .menu-list li {
        margin-top: 45px;
    }
    .navbar .menu-list li a {
        font-size: 24px;
    }
}


        li {
            border: 1px solid var(--primary-blue);
        }
    `;

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const preview = this.previews

        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })

        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if (this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if (this.sorting === 'z-a') return a.title.localeCompare(b.title)
            
            const dateA = new Date(a.updated).getTime()
            const dateB = new Date(b.updated).getTime()
            
            if (this.sorting === 'oldest-latest') return dateA - dateB
            if (this.sorting === 'latest-oldest')  return dateB - dateA
            throw new Error('Invalid Sorting')
        })
        
     

        const list = sortedPreviews.map(({ title, id, updated }) => {
            const updateAsDate = new Date(updated)
            const day = date.getDate().toString().padStart(2, '0')
            const month = MONTHS[date.getMonth() - 1]
            const year = date.getfullYear()

            const clickHandler = () => store.loadSingle(id)

            return html`
                <li>
                    <button @click="${clickHandler}">
                        ${title}
                    </button>
                    <div>${day}/${month}/${year}</div>
                </li>
            `
        })

        return html`
            <h1>Podcast List</h1>
            <podcast-controls></podcast-controls>
            ${list.length > 0 ? html`<ul>${list}</ul>` : html`<div>No matches</div>`}
        `
    }
}

customElements.define('podcast-view-list', Component)