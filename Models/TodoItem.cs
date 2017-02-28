using System;

public class TodoItem {
    public TodoItem(string text)
    {
        Text = text;
        Id = Guid.NewGuid();
        Complete = false;
    }

    public string Text {get;}
    public Guid Id {get;}

    public bool Complete {get;}
}