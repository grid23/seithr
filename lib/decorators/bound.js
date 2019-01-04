"use strict"

export default ({ kind, key, placement, descriptor }) => {
    if ( kind !== "method")
      return { kind, key, placement, descriptor }

    if ( descriptor.value)
      return {
          kind, key, placement, descriptor
        , extras: [{
              kind:"field", key, placement: "own",  descriptor: { ...descriptor, value: undefined }
            , initializer(){ return this::descriptor.value }
          }]
      }
    else if ( descriptor.get )
      return {
          kind, key, placement, descriptor: {
              ...descriptor
            , get(){ return this::descriptor.get() }
          }
      }
}
