import { Tracer } from "../tracer"
import { RootSpan } from "../span"

describe("Tracer", () => {
  const name = "test_instrumentation"

  let tracer: Tracer

  beforeEach(() => {
    tracer = new Tracer()
  })

  it("creates a RootSpan", () => {
    const name = "test"
    const span = tracer.createSpan(name)
    const internal = JSON.parse(span.toJSON())

    expect(span).toBeInstanceOf(RootSpan)
    expect(internal.name).toEqual(name)
  })

  it("can instrument a function", done => {
    tracer.withSpanSync(tracer.createSpan(name), span => {
      const internal = JSON.parse(span.toJSON())
      expect(internal.name).toEqual(name)
      
      span.close()
    })

    return done()
  })

  it("can instrument a function (async)", async done => {
    await tracer.withSpan(tracer.createSpan(name), async span => {
      const internal = JSON.parse(span.toJSON())
      expect(internal.name).toEqual(name)
      
      span.close()
    })

    return done()
  })
})
