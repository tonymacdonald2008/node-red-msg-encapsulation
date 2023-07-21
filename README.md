# node-red-msg-encapsulation
wrap existing Node-Red message to preserve properties to be used later in the flow

## Wrap

### Outputs

: wrapped_msg (object) :  the entire incoming message.

### Details</h3>
 
The entire incoming message is wrapped into a property `msg.wrapped_msg` on a new otherwise empty message which is sent on the output.

## Unwrap

### Inputs

: `wrapped_msg` (object)   :  the original wrapped message object to be unwrapped. 
: `payload` :  the payload to be added to the unwrapped message as `msg.outer_payload<`

### Output

: `outer_payload` :  The payload of the incoming message
: `all other properties`   :  The properties of the original wrapped message from `msg.wrapped_msg` on the incoming message.

### Details

The previously wrapped message is extracted from the `wrapped_msg` property of the incoming message, 
The payload of the incoming message is preserved as a new property `outer_payload` added to the unwrapped message and it is sent oun the output.

The `outer_payload` propterty on the unwrapped message allows the result of the intervening flow to be integrated with the newly unwrapped message.

If there is no `wrapped_msg` property on the incoming message, an error is logged and the incoming message is passed unchanged to the output.

Using the `wrap` and `unwrap` nodes around a destructive section of the flow allows for processing on the intervening flow without owerwriting properties of the wrapped message.

