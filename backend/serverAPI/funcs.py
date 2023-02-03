def GenUniqueUserCode():
    import random
    from .models import User

    codes = [usr.user_code for usr in User.objects.all()]
    chars = '+-*!&$#?=@<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    while True:
        password = ''
        for i in range(40):
            password += random.choice(chars)
        if not (password in codes):
            break

    return password
