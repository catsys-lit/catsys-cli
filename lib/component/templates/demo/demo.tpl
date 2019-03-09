<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="module">
        import '../{{TAG_NAME}}.js';
    </script>
    <title>{{CLASS_NAME}}</title>
</head>
<body>
    <style>
        .card {
                padding: 10px;
                color: #757575;
                border-radius: 5px;
                background-color: #fff;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }
            .circle {
                display: inline-block;
                width: 64px;
                height: 64px;
                text-align: center;
                color: #555;
                border-radius: 50%;
                background: #ddd;
                font-size: 30px;
                line-height: 64px;
            }
    </style>
    <div class="card">
        <div class="circle">1</div>
        <{{TAG_NAME}}></{{TAG_NAME}}>
    </div>
</body>
</html>
