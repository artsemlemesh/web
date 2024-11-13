const statusMapper = new Map()
statusMapper.set('a', 'Active')
statusMapper.set('s', 'Ready To Ship')
statusMapper.set('i', 'Label Pending')
statusMapper.set('p', 'Label Printed')
statusMapper.set('f', 'Label Failure')
statusMapper.set('t', 'In Transit')
statusMapper.set('d', 'Received')
statusMapper.set('c', 'Canceled')
statusMapper.set('r', 'In Return')

export default statusMapper
