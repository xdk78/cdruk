import React, { useEffect } from 'react'
import Footer from '../components/footer'
import Link from 'next/link'
import { fetchModels } from '../store'
import { useDispatch, useSelector, connect } from 'react-redux'

type Model = {
  id?: number
  name?: string
  description?: string
  stlFile?: string
  pictureURI?: string
}

function Models() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchModels())
  }, [])
  const models = useSelector((state: { models: Model[] }) => state.models)

  return (
    <div>
      <div className="selection">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">CDRUK</a>
          </Link>
        </div>
        <div className="selection">
          <div className="container">
            <div className="list">
              {models && models.length > 0 ? (
                models.map((el) => (
                  <div key={el.id} className="list-item">
                    <div className="card">
                      <img src={el.pictureURI} alt={el.pictureURI} />
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{el.name}</p>
                          </div>
                        </div>

                        <div className="content">{el.description}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="title is-3">No models avaliable</h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default connect()(Models)
